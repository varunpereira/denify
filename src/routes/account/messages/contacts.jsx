import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getGlobalState } from 'utils/globalState'
import Link from 'next/link'
import getAuth from 'utils/getAuth'
import connectDB from 'utils/connectDB'
import userModel from 'models/userModel'


export default function component(props) {
  let { user } = JSON.parse(props.props)

  let router = useRouter()

  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      <div className="rounded-lg bg-white pb-2 pl-2 text-black">
        <h1 className="mb-5 pt-4 text-2xl font-semibold">Messages</h1>
        {user.messageEmails.map((messageEmail, index) => (
          <Link
            key={index}
            href={'/account/messages?recipEmail=' + messageEmail + '#latest'}
          >
            <div className="mx-2 mb-2 rounded-md border-2 border-gray-600 hover:bg-gray-200">
              <a className="">{messageEmail}</a>
            </div>
          </Link>
        ))}

        {/* {JSON.stringify(user.messageEmails)}d */}
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

  let user = await userModel.findOne({
    email: auth.user.email,
  })

  return {
    props: {
      props: JSON.stringify({ auth: auth, user: user }),
    },
  }
}
