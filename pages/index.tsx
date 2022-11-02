import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useSWR, { Fetcher } from 'swr'
import { toHex, toRgb } from '../lib/utils'

type Joke = {
  id: string
  joke: string
}

const fallbackData = [
  {
    id: '',
    joke: 'init'
  }
]

const Home: NextPage = () => {
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data: jokes } = useSWR('/api/jokes', fetcher, {
    fallbackData,
    refreshInterval: 5000
  })

  return (
    <div className="flex gap-2 flex-wrap justify-center mt-4">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {jokes.map((joke: Joke) => (
        <div
          className="grid w-[200px] h-[200px] rounded overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(
              Math.sqrt(toHex(joke.joke).length / 6)
            )}, 1fr)`
          }}
        >
          {toHex(joke.joke)
            .match(/.{1,6}/g)
            ?.map((x) => (
              <div
                style={{
                  background: `rgb(${toRgb(x).join(',')})`
                }}
              ></div>
            ))}
          {[
            ...(toHex(joke.id).match(/.{1,6}/g) || []),
            ...(toHex(joke.joke).match(/.{1,6}/g) || [])
          ]
            .slice(
              0,
              Math.pow(Math.ceil(Math.sqrt(toHex(joke.joke).length / 6)), 2) -
                (toHex(joke.joke).match(/.{1,6}/g)?.length || 0)
            )
            .map((x) => (
              <div
                style={{
                  background: `rgb(${toRgb(x).join(',')})`
                }}
              ></div>
            ))}
        </div>
      ))}
    </div>
  )
}

export default Home
