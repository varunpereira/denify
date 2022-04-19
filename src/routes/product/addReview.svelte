<!-- import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { setGlobalState, getGlobalState } from 'utils/globalState'
import axios from 'axios'
import Cookie from 'js-cookie'
import getAuth from 'utils/getAuth'
import connectDB from 'utils/connectDB'

import productModel from 'models/productModel'

export default function component(props) {
  let { product } = JSON.parse(props.props)

  let router = useRouter()
  let [reviewData, setUserData] = useState({
    rating: '',
    description: '',
    email: '',
    productId: product._id,
  })
  let { rating, description, email, productId } = reviewData
  let [error, setError] = useState('')

  function handleChangeInput(e) {
    let { name, value } = e.target
    setUserData({ ...reviewData, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let numRating = Number(rating)
    if (isNaN(numRating)) {
      setError('Rating can only be a number.')
      return
    }
    if (numRating > 5 || numRating < 0) {
      setError('Allowed rating range is 0 to 5 inclusive.')
      return
    }

    try {
      reviewData = { ...reviewData, email: getGlobalState('auth').user.email }

      let res = await axios.post('/api/review/add', reviewData)
      if (res.data.err) {
        setError(res.data.err)
        return
      }
      router.push('/product?productId=' + product._id)
    } catch (resError) {
      console.log(resError)
    }
  }

  return (
    <div className="bg-grey-lighter flex flex-col">
      <Head>
        <title>Add Review</title>
      </Head>
      <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
        <div className="w-full rounded bg-white  px-20 py-8 text-black shadow-md">
          <h1 className="mb-8 text-center text-3xl">
            Add a Review for {product.title}
          </h1>
          <p>Rating (out of 5)</p>
          <input
            name="rating"
            value={rating}
            onChange={handleChangeInput}
            type="text"
            className="border-grey-light mb-4 block w-full rounded border p-3"
          />
          <p>Description</p>
          <input
            name="description"
            value={description}
            onChange={handleChangeInput}
            type="text"
            className="border-grey-light mb-4 w-full rounded border p-3"
          />
          <button
            onClick={handleSubmit}
            type="button"
            className="hover:bg-green-dark my-1 w-full rounded bg-black py-3 text-center text-white focus:outline-none"
          >
            Add
          </button>
          <div className="mt-10 text-red-500">{error}</div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query, req }) {
  let auth = await getAuth(req.cookies.refreshToken)
  if (auth.error || !req.cookies.refreshToken) {
    return {
      redirect: {
        destination: '/signin',
      },
    }
  }
  connectDB()

  let product = await productModel.findOne({
    _id: query.productId,
  })

  return {
    props: { props: JSON.stringify({ auth, product }) },
  }
} -->
