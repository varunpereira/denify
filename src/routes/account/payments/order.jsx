import axios from 'axios'
import orderModel from 'models/orderModel'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import connectDB from 'utils/connectDB'
import getAuth from 'utils/getAuth'
import { getGlobalState } from 'utils/globalState'


export default function component(props) {
  let { order } = JSON.parse(props.props)


  let router = useRouter()

  return (
    <div>
      <Head>
        <title>Past Order Details</title>
      </Head>
      <div className="rounded-lg bg-white text-black ">
        <h1 className="text-2xl font-semibold">Past Order Details</h1>
        <br></br>
        <p>Order ID: {order._id}</p>
        <p>Order Quantity: {order.quantity}</p>
        <p>Order Price: ${order.price}</p>
        <p>Order Date: {order.updatedAt}</p>

        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Title</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">ID</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Qty</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Price</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {order.products.map((product) => (
                  <tr key={product.productId} className="my-4 text-black">
                    <td>{product.productTitle}</td>
                    <td>{product.productId}</td>
                    <td>{product.productQuantity}</td>
                    <td>${product.productPrice}</td>
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

  let order = await orderModel.findById(query.orderId)

  return {
    props: { props: JSON.stringify({ auth: auth, order: order }) },
  }
}
