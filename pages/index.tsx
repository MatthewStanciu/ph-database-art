import type { NextPage } from 'next'
import Head from 'next/head'
import useSWR, { Fetcher } from 'swr'
import Submit from '../components/submit'
import { toHex, toRgb } from '../lib/utils'

type Joke = {
  id: string
  joke: string
}

const fallbackData: Joke[] = [
  {
    id: '',
    joke: 'init'
  }
]

const Home: NextPage = () => {
  const fetcher: Fetcher<Joke[], string> = (route) =>
    fetch(route).then((res) => res.json())
  let { data: jokes } = useSWR('/api/jokes', fetcher, {
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
        {jokes?.map((joke) => (
          <div
            className="grid w-[200px] h-[200px] rounded overflow-hidden"
            key={joke.id}
            style={{
              gridTemplateColumns: `repeat(${Math.ceil(
                Math.sqrt(toHex(joke.joke).length / 6)
              )}, 1fr)`
            }}
            onClick={() => alert(joke.joke)}
          >
            {toHex(joke.joke)
              .match(/.{1,6}/g)
              ?.map((x) => (
                <div
                  key={x}
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
                  key={x}
                  style={{
                    background: `rgb(${toRgb(x).join(',')})`
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
