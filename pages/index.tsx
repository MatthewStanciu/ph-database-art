import type { NextPage } from 'next'
import Head from 'next/head'
import useSWR, { Fetcher } from 'swr'
import Submit from '../components/submit'
import { toHex, toRgb } from '../lib/utils'

type Message = {
  id: string
  message: string
}

const fallbackData: Message[] = [
  {
    id: '',
    message: 'init'
  }
]

const Home: NextPage = () => {
  const fetcher: Fetcher<Message[], string> = (route) =>
    fetch(route).then((res) => res.json())
  const { data: messages } = useSWR('/api/messages', fetcher, {
    fallbackData,
    refreshInterval: 5000
  })

  return (
    <div className="flex flex-col items-center my-8 gap-8">
      <Head>
        <title>Database Art 🌈</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Submit />
      <div className="flex gap-2 ml-10 flex-wrap xl:container xl:items-center">
        {messages?.map((message, i) => (
          <div
            className="grid w-[200px] h-[200px] rounded overflow-hidden"
            key={message.message + i}
            style={{
              gridTemplateColumns: `repeat(${Math.ceil(
                Math.sqrt(toHex(message.message).length / 6)
              )}, 1fr)`
            }}
            onClick={() => alert(message.message)}
          >
            {toHex(message.message)
              .match(/.{1,6}/g)
              ?.map((color, i) => (
                <div
                  key={color + i}
                  style={{
                    background: `rgb(${toRgb(color).join(',')})`
                  }}
                ></div>
              ))}
            {[
              ...(toHex(message.id).match(/.{1,6}/g) || []),
              ...(toHex(message.message).match(/.{1,6}/g) || [])
            ]
              .slice(
                0,
                Math.pow(
                  Math.ceil(Math.sqrt(toHex(message.message).length / 6)),
                  2
                ) - (toHex(message.message).match(/.{1,6}/g)?.length || 0)
              )
              .map((color, i) => (
                <div
                  key={color + i + i}
                  style={{
                    background: `rgb(${toRgb(color).join(',')})`
                  }}
                ></div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
