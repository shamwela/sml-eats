import 'styles/globals.css'

import type { AppProps } from 'next/app'
import type { CartItem } from 'types/cartItem'
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
        slug: 'seafood-cocktail',
        category: 'Pizza',
        deliveryFee: 1,
        deliveryTime: 30,
        basePrice: 20,
      },
      {
        name: 'BBQ Pork Deluxe',
        slug: 'bbq-pork-deluxe',
        category: 'Pizza',
        deliveryFee: 1,
        deliveryTime: 30,
        basePrice: 15,
      },
    ],
  },
]

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [cart, setCart] = useState<CartItem[] | undefined>(undefined)

  const updateCart = (item: CartItem) => {
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
