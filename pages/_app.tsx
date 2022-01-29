import 'styles/globals.css'

import type { AppProps } from 'next/app'
import { useState } from 'react'

type item = {
  name: string
  quantity: number
  price: number
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [cart, setCart] = useState<item[] | undefined>(undefined)

  const updateCart = (item: item) => {
    setCart((previousCart) => {
      if (!previousCart) {
        previousCart = []
      }

      return [...previousCart, item]
    })
  }

  return <Component {...pageProps} cart={cart} updateCart={updateCart} />
}

export default MyApp
