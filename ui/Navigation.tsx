import { useEffect, useState } from 'react'

import type { CartItem } from 'types/cartItem'
import Link from 'next/link'
import { useRouter } from 'next/router'

type NavigationProps = {
  cart: CartItem[]
}

const Navigation = ({ cart }: NavigationProps) => {
  const [totalQuantity, setTotalQuantity] = useState(0)

  useEffect(() => {
    const newTotalQuantity = cart.reduce(
      (previousQuantity, cartItem) => previousQuantity + cartItem.quantity,
      0
    )
    setTotalQuantity(newTotalQuantity)
  }, [cart])

  const { pathname } = useRouter()
  const isNotCartPage = pathname !== '/cart'
  const cartExists = cart.length > 0
  const showCartButton = isNotCartPage && cartExists

  return (
    <nav className='mb-4'>
      <section className='mx-auto flex max-w-md justify-between'>
        <Link href='/'>
          <a className='text-4xl font-bold'>SML Eats</a>
        </Link>

        {showCartButton && (
          <Link href='/cart'>
            <a>
              <button className='fixed right-5 left-5 bottom-5 z-10 flex items-center justify-center gap-x-2 md:static'>
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
  )
}

export default Navigation
