import axios from 'axios'
import Head from 'next/head'
import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getGlobalState } from 'utils/globalState'
import ProductItem from 'components/product/item'
import Link from 'next/link'
import getAuth from 'utils/getAuth'
import connectDB from 'utils/connectDB'
import productModel from 'models/productModel'


export default function component(props) {
  let {  products, email } = JSON.parse(props.props)
  let router = useRouter()

  async function handleSendMessage(e) {
    e.preventDefault()
    let res = await axios.post('/api/user/setMessageEmails', {
      email: getGlobalState('auth').user.email,
      anothersEmail: email,
    })
    if (res.data.success) {
      router.push('/account/messages?recipEmail=' + email + '#latest')
    }
  }

  return (
    <div>
      <Head>
        <title>Profile - {email}</title>
      </Head>

      <div className="">
        <h1 className="mb-10 text-2xl font-semibold">{email}'s Products</h1>
        {getGlobalState('auth').user && (
          <a
            onClick={(e) => handleSendMessage(e)}
            className="hover:text-gray-400 cursor-pointer"
          >
            Message
          </a>
        )}

        <div className="flex flex-wrap text-white">
          {products.length === 0 ? (
            <h2>No Products</h2>
          ) : (
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query: { email }, req }) {
  let auth = await getAuth(req.cookies.refreshToken)
  if (auth.error || !req.cookies.refreshToken) {
    // return {
    //   redirect: {
    //     destination: '/signin',
    //   },
    // }
  }
  connectDB()

  let products = await productModel.find({
    email: email,
  })

  return {
    props: { props: JSON.stringify({ auth, products, email }) },
  }
}
