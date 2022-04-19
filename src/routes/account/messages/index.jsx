import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getGlobalState } from 'utils/globalState'
import Link from 'next/link'
import { ArrowCircleUpIcon } from '@heroicons/react/solid'
import getAuth from 'utils/getAuth'
import connectDB from 'utils/connectDB'
import messagesModel from 'models/messagesModel'



export default function component(props) {
  let { messages1, recipEmail } = JSON.parse(props.props)
  let router = useRouter()

  let[messages, setMessages] = useState(messages1)
  let [newMessage, setNewMessage] = useState([])

  async function sendNewMessage(e) {
    e.preventDefault()
    let body = {
      email1: getGlobalState('auth').user.email,
      email2: recipEmail,
      newMessage: { [getGlobalState('auth').user.email]: newMessage },
    }
    let res = await axios.post('/api/messages/add', body)
    setMessages(res.data.messages)
  }

  return (
    <>
      <Head>
        <title>Messages to {recipEmail}</title>
      </Head>

      <div className="rounded-md bg-white text-black ">
        <h1 className=" flex justify-center rounded-t-md border-2 border-gray-400 py-2 text-xl font-semibold">
          {recipEmail}
        </h1>
        <div className="grid h-80 gap-3 overflow-auto py-3 text-white">
          {messages &&
            messages.map((message, index) => (
              <div key={index} className="">
                {messages.length - 1 === index ? (
                  Object.keys(message)[0] ===
                  getGlobalState('auth').user.email ? (
                    <div id="latest" className="flex justify-end">
                      <div className="mr-2 max-w-max rounded-t-3xl rounded-l-3xl bg-green-600 px-3 py-1">
                        {message[getGlobalState('auth').user.email]}
                      </div>
                    </div>
                  ) : (
                    <div id="latest" className="flex justify-start">
                      <div className="ml-2 max-w-max rounded-t-3xl rounded-r-3xl  bg-blue-600 px-3 py-1">
                        {message[recipEmail]}
                      </div>
                    </div>
                  )
                ) : Object.keys(message)[0] ===
                  getGlobalState('auth').user.email ? (
                  <div className="flex justify-end">
                    <div className="mr-2 max-w-max rounded-t-3xl rounded-l-3xl bg-green-600 px-3 py-1">
                      {message[getGlobalState('auth').user.email]}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="ml-2 max-w-max rounded-t-3xl rounded-r-3xl  bg-blue-600 px-3 py-1">
                      {message[recipEmail]}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>

        <form
          onSubmit={(e) => sendNewMessage(e)}
          className="relative w-full rounded-b-md border-2 border-gray-400"
        >
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            className="focus:shadow-outline w-full min-w-max rounded-b-md bg-white  py-2 pl-2 text-sm leading-tight text-black focus:outline-none"
            placeholder="type message"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 w-10  max-w-min items-center justify-center rounded-b-md bg-white pr-2"
          >
            <ArrowCircleUpIcon className="h-6 w-6 rounded-lg fill-green-500" />
          </button>
        </form>
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

  let messages = []
  let mail1 = auth.user.email
  let mail2 = query.recipEmail
  try {
    let message1 = await messagesModel.findOne({
      email1: email1,
      email2: email2,
    })
    let message2 = await messagesModel.findOne({
      email1: email2,
      email2: email1,
    })
    if (message1 === null && message2 === null) {
      return {
        redirect: {
          destination: '/account/messages/contacts',
        },
      }
    }
    if (message1 === null) {
      messages = message2.messages
    }
    messages = message1.messages
  } catch (error) {}

  return {
    props: {
      props: JSON.stringify({
        auth,
        recipEmail: query.recipEmail,
        messages1: messages,
      }),
    },
  }
}
