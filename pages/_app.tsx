import 'styles/globals.css'

import type { AppProps } from 'next/app'
import type { Item } from 'types/item'
import Link from 'next/link'
import { useState } from 'react'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [cart, setCart] = useState<Item[] | undefined>(undefined)

  const updateCart = (item: Item) => {
    setCart((previousCart) => {
      if (!previousCart) {
        previousCart = []
      }

      return [...previousCart, item]
    })
  }

  return (
    <>
      <nav className='flex gap-x-4 border-b-2 p-4 flex-wrap items-center'>
        <Link href='/'>
          <a className='text-4xl font-bold'>SML Eats</a>
        </Link>
        <Link href='/store/the-pizza-company'>
          <a>The Pizza Company</a>
        </Link>
      </nav>
      <Component {...pageProps} cart={cart} updateCart={updateCart} />
    </>
  )
}

export default MyApp
