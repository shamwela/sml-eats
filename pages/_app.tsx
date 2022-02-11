import 'styles/globals.css'

import type { AppProps } from 'next/app'
import type { CartItem } from 'types/cartItem'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'
import ThePizzaCompanyImage from 'public/images/the-pizza-company.webp'
import { useState } from 'react'

const restaurants: Restaurant[] = [
  {
    name: 'The Pizza Company',
    slug: 'the-pizza-company',
    path: '/restaurants/the-pizza-company',
    category: 'Pizza',
    rating: 4.9,
    imageProperties: {
      src: ThePizzaCompanyImage
    },
    items: [
      {
        name: 'Seafood Cocktail',
        slug: 'seafood-cocktail',
        path: '/restaurants/the-pizza-company/seafood-cocktail',
        category: 'Pizza',
        deliveryFee: 1,
        deliveryTime: 30,
        basePrice: 20,
      },
      {
        name: 'BBQ Pork Deluxe',
        slug: 'bbq-pork-deluxe',
        path: '/restaurants/the-pizza-company/bbq-pork-deluxe',
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
    path: '/restaurants/starbucks',
    category: 'Coffee',
    rating: 4.8,
    imageProperties: {
      src: ThePizzaCompanyImage
    },
    items: [
      {
        name: 'Irish Cream Cold Brew',
        slug: 'irish-cream-cold-brew',
        path: '/restaurants/starbucks/irish-cream-cold-brew',
        category: 'coffee',
        deliveryFee: 1,
        deliveryTime: 15,
        basePrice: 20,
      },
      {
        name: 'Iced Coffee',
        slug: 'iced-coffee',
        path: '/restaurants/starbucks/iced-coffee',
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

  const addItem = (newCartItem: CartItem) => {
    const newCart = [...cart, newCartItem]
    setCart(newCart)
  }

  const changeItemQuantity = (name: string, quantity: number) => {
    let newCart: CartItem[] = []

    // If the quantity is 0, remove the item from the cart
    if (quantity === 0) {
      newCart = cart.filter((item) => item.name !== name)
    } else {
      // Otherwise, change the quantity
      newCart = cart.map((item) => {
        if (item.name === name) {
          const finalPrice = item.oneItemPrice * quantity
          return { ...item, quantity, finalPrice }
        }
        return item
      })
    }

    setCart(newCart)
  }

  return (
    <>
      <nav className='mb-4'>
        <section className='mx-auto flex max-w-md justify-between'>
          <Link href='/'>
            <a className='text-4xl font-bold'>SML Eats</a>
          </Link>
          {cart.length > 0 && (
            <Link href='/cart'>
              <a className='button fixed right-5 left-5 bottom-5 md:static'>
                View order
              </a>
            </Link>
          )}
        </section>
      </nav>

      <main className='mx-auto mb-24 flex max-w-md flex-col gap-y-4'>
        <Component
          {...pageProps}
          restaurants={restaurants}
          cart={cart}
          addItem={addItem}
          changeItemQuantity={changeItemQuantity}
        />
      </main>
    </>
  )
}

export default MyApp
