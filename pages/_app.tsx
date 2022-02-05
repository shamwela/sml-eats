import 'styles/globals.css'

import type { AppProps } from 'next/app'
import type { Item } from 'types/item'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'
import { useState } from 'react'

const restaurants: Restaurant[] = [
  {
    name: 'The Pizza Company',
    rating: 4,
    items: [
      {
        name: 'Seafood Cocktail',
        category: 'Pizza',
        deliveryFee: 1,
        deliveryTime: 30,
        basePrice: 20,
        slug: 'seafood-cocktail',
      },
    ],
  },
]

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
      <nav className='flex flex-wrap items-center gap-x-4 border-b-2 p-4'>
        <Link href='/'>
          <a className='text-4xl font-bold'>SML Eats</a>
        </Link>
        <Link href='/store/the-pizza-company'>
          <a>The Pizza Company</a>
        </Link>
      </nav>
      <Component
        {...pageProps}
        restaurants={restaurants}
        cart={cart}
        updateCart={updateCart}
      />
    </>
  )
}

export default MyApp
