import 'styles/globals.css'

import type { AppProps } from 'next/app'
import type { CartItem } from 'types/cartItem'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'
import { useState } from 'react'

const restaurants: Restaurant[] = [
  {
    name: 'The Pizza Company',
    slug: 'the-pizza-company',
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
  {
    name: 'Starbucks',
    slug: 'starbucks',
    rating: 5,
    items: [
      {
        name: 'Irish Cream Cold Brew',
        slug: 'irish-cream-cold-brew',
        category: 'coffee',
        deliveryFee: 1,
        deliveryTime: 15,
        basePrice: 20,
      },
      {
        name: 'Iced Coffee',
        slug: 'iced-coffee',
        category: 'coffee',
        deliveryFee: 1,
        deliveryTime: 15,
        basePrice: 15,
      },
    ],
  },
]

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const updateCart = (newCartItem: CartItem) => {
    const newCart = [...cart, newCartItem]
    setCart(newCart)
  }

  return (
    <>
      <nav className='flex flex-wrap items-center gap-x-4 border-b-2 p-4'>
        <Link href='/'>
          <a className='text-4xl font-bold'>SML Eats</a>
        </Link>
      </nav>
      <Component
        {...pageProps}
        restaurants={restaurants}
        cart={cart}
        updateCart={updateCart}
      />

      <Link href='/cart'>
        <a className='button fixed bottom-5 left-5 right-5'>View order</a>
      </Link>
    </>
  )
}

export default MyApp
