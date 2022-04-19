import axios from 'axios'
 
import orderModel from 'models/orderModel'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import connectDB from 'utils/connectDB'
import getAuth from 'utils/getAuth'
import { getGlobalState } from 'utils/globalState'


export default function component(props) {
  let {  orders } = JSON.parse(props.props)
  
  let router = useRouter()

  async function refund(checkoutSessionId, index) {
    let res = await axios.post('/api/stripe/refund/' + checkoutSessionId)
    if (res.data.refunded) {
      // need usestate then state here so no refresh, can get data from db
      return
    }
  }

  return (
    <>
      <Head>
        <title>Order History</title>
      </Head>
      <div className="flex h-full w-full flex-col justify-center  rounded-sm border border-gray-200 bg-white pl-2 text-black shadow-lg">
        <h1 className="text-2xl font-semibold">Order History</h1>
        <br></br>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">ID</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Qty</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Price</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Date</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Refund Status</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {orders.map((order, index) => (
                  <tr key={order._id} className="my-4 text-black">
                    <td>
                      {getGlobalState('auth').user && (
                        <Link
                          href={'/account/payments/order?orderId=' + order._id}
                        >
                          <a className="hover:underline">{order._id}</a>
                        </Link>
                      )}
                    </td>
                    <td>{order.quantity}</td>
                    <td>${order.price}</td>
                    <td>{order.updatedAt}</td>
                    <td>
                      {order.refunded ? (
                        'already refunded'
                      ) : (
                        <a
                          className="hover:underline"
                          onClick={() => {
                            refund(order.checkoutSessionId, index)
                          }}
                        >
                          refund
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
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
  let orders = await orderModel.find({
    email: auth.user.email,
  })
  return {
    props: { props: JSON.stringify({ auth: auth, orders: orders }) },
  }
}
