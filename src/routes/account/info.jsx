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
  let {  user } = JSON.parse(props.props)

  let router = useRouter()

  return (
    <div>
      <Head>
        <title>Account</title>
      </Head>

      <div className="rounded-lg bg-white pl-2 text-black">
        <h1 className=" text-2xl font-semibold">Account Details</h1>
        <div>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Joined:</b> {user.createdAt}
          </p>
        </div>
        {/* <a onClick={() => setView(!view)} className="text-xl font-semibold">
          {view === true ? 'Edit' : 'View'}
        </a>
        :{view === true ? <View user={user}></View> : 'hi'} */}
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

  let user = await userModel.findOne({
    email: auth.user.email,
  })

  return {
    props: { props: JSON.stringify({ auth: auth, user: user }) },
  }
}
