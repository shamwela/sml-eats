import 'styles/globals.css'

import type { AppProps } from 'next/app'
import type { Item } from 'types/item'
import Link from 'next/link'
import { useState } from 'react'

const restaurants = [
  {
    name: 'The Pizza Company',
    items: [
      {
        name: 'Seafood Cocktail',
        category: 'Pizza',
        deliveryFee: 1,
        deliveryTime: 30,
        options: {
          crusts: [
            {
              name: 'Crispy Thin',
              additionalPrice: 0,
            },
            {
              name: 'Extra Cheesy Sausage Bites',
              additionalPrice: 3,
            },
          ],
          // sizes: {
          //   Large: 5,
          //   Medium: 3,
          //   Small: 0,
          // },
        },
        basePrice: 20,
        slug: 'seafood-cocktail',
      },
    ],
    review: 4,
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
