import 'styles/globals.css'

import type { AppProps } from 'next/app'
import Cart from 'ui/Cart'
import type { CartItem } from 'types/cartItem'
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

        <Cart cart={cart} />
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
