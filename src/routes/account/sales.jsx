import axios from 'axios'
 
import productModel from 'models/productModel'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import connectDB from 'utils/connectDB'
import getAuth from 'utils/getAuth'
import { getGlobalState } from 'utils/globalState'


export default function component(props) {
  let {  products } = JSON.parse(props.props)

  let router = useRouter()

  return (
    <div>
      <Head>
        <title>Selling</title>
      </Head>

      <div className="rounded-lg bg-white pl-2 text-black ">
        <h1 className="text-2xl font-semibold">Your Products</h1>

        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">ID</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Title</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Description</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Category</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Price</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Sold</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Stock</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {products.map((product) => (
                  <tr key={product._id} className="my-4 text-black">
                    <td>{product._id}</td>
                    <td> {product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product.sold}</td>
                    <td> {product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

  let products = await productModel.find({
    email:auth.user.email,
  })

  return {
    props: { props: JSON.stringify({ auth: auth, products: products }) },
  }
}
