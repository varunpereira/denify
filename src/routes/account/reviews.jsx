import axios from 'axios'
 
import reviewModel from 'models/reviewModel'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import connectDB from 'utils/connectDB'
import getAuth from 'utils/getAuth'
import { getGlobalState } from 'utils/globalState'


export default function component(props) {
  let {  reviews } = JSON.parse(props.props)
  let router = useRouter()



  return (
    <div>
      <Head>
        <title>Reviews</title>
      </Head>

      <div className="pl-2 rounded-lg bg-white text-black ">
        <h1 className="text-2xl font-semibold">Reviews</h1>

        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Review ID</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Product ID</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Rating</div>
                  </th>
                  <th className="whitespace-nowrap ">
                    <div className="text-left font-semibold">Description</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {reviews.map((review) => (
                  <tr key={review._id} className="my-4 text-black">
                    <td>{review._id}</td>
                    <td>{review.productId}</td>
                    <td>{review.rating}/5</td>
                    <td>{review.description}</td>
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

  let reviews = await reviewModel.find({
    email: auth.user.email,
  });

  return {
    props: { props: JSON.stringify({ auth: auth, reviews:reviews }) },
  }
}
