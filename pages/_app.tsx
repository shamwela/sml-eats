import 'styles/globals.css'

import { useEffect, useState } from 'react'

import type { AppProps } from 'next/app'
import BBQPorkDeluxeImage from 'public/images/bbq-pork-deluxe.jpeg'
import type { CartItem } from 'types/cartItem'
import CoffeeImage from 'public/images/coffee.png'
import IcedCoffeeImage from 'public/images/iced-coffee.png'
import IrishCreamColdBrewImage from 'public/images/irish-cream-cold-brew.png'
import Link from 'next/link'
import PizzaImage from 'public/images/pizza.png'
import type { Restaurant } from 'types/restaurant'
import SeafoodCocktailImage from 'public/images/seafood-cocktail.jpeg'
import StarbucksImage from 'public/images/starbucks.webp'
import ThePizzaCompanyImage from 'public/images/the-pizza-company.webp'

const restaurants: Restaurant[] = [
  {
    name: 'The Pizza Company',
    slug: 'the-pizza-company',
    path: '/restaurants/the-pizza-company',
    category: 'Pizza',
    rating: 4.9,
    imageSource: ThePizzaCompanyImage,
    items: [
      {
        name: 'Seafood Cocktail',
        slug: 'seafood-cocktail',
        path: '/restaurants/the-pizza-company/seafood-cocktail',
        imageSource: SeafoodCocktailImage,
        category: 'Pizza',
        deliveryFee: 1,
        deliveryTime: 30,
        basePrice: 20,
      },
      {
        name: 'BBQ Pork Deluxe',
        slug: 'bbq-pork-deluxe',
        path: '/restaurants/the-pizza-company/bbq-pork-deluxe',
        imageSource: BBQPorkDeluxeImage,
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
    imageSource: StarbucksImage,
    items: [
      {
        name: 'Irish Cream Cold Brew',
        slug: 'irish-cream-cold-brew',
        path: '/restaurants/starbucks/irish-cream-cold-brew',
        imageSource: IrishCreamColdBrewImage,
        category: 'coffee',
        deliveryFee: 1,
        deliveryTime: 15,
        basePrice: 20,
      },
      {
        name: 'Iced Coffee',
        slug: 'iced-coffee',
        path: '/restaurants/starbucks/iced-coffee',
        imageSource: IcedCoffeeImage,
        category: 'coffee',
        deliveryFee: 1,
        deliveryTime: 15,
        basePrice: 15,
      },
    ],
  },
]
const categoryImageProperties = [
  {
    name: 'Pizza',
    imageSource: PizzaImage,
  },
  {
    name: 'Coffee',
    imageSource: CoffeeImage,
  },
]

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [totalQuantity, setTotalQuantity] = useState(0)

  useEffect(() => {
    const totalQuantity = cart.reduce(
      (previousQuantity, cartItem) => previousQuantity + cartItem.quantity,
      0
    )
    setTotalQuantity(totalQuantity)
  }, [cart])

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
              <a>
                <button className='fixed right-5 left-5 bottom-5 z-10 flex items-center gap-x-2 justify-center md:static'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    viewBox='0 0 16 16'
                    fill='currentColor'
                    className='h-4 w-4'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M3.666 11.333h10.333l1.334-8h-11l-.267-2h-3.4v2h1.667l1.333 8zm1.333 3.334A1.333 1.333 0 105 12a1.333 1.333 0 000 2.667zm9.334-1.334a1.333 1.333 0 11-2.667 0 1.333 1.333 0 012.667 0z'
                    ></path>
                  </svg>
                  Cart • {totalQuantity}
                </button>
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
          categoryImageProperties={categoryImageProperties}
        />
      </main>
    </>
  )
}

export default MyApp
