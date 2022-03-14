import { useEffect, useState } from 'react'
import { auth, logout } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import type { CartItem } from 'types/cartItem'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

type NavigationProps = {
  cart: CartItem[]
}

const Navigation = ({ cart }: NavigationProps) => {
  const { theme, setTheme } = useTheme()
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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const [user] = useAuthState(auth)

  return (
    <nav className='top-0 z-10 bg-white py-4 dark:bg-gray-900 md:sticky'>
      <div className='mx-auto flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-2'>
        <Link href='/'>
          <a className='text-xl font-bold md:text-4xl'>SML Eats</a>
        </Link>

        {pathname !== '/search' && (
          <Link href='/search'>
            <a aria-label='Search'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </Link>
        )}

        <div className='flex gap-x-[inherit]'>
          {pathname !== '/delivery-details' && (
            <Link href='/delivery-details'>
              <a>
                <button>Delivery details</button>
              </a>
            </Link>
          )}

          <button onClick={toggleTheme}>Change theme</button>
        </div>

        {showCartButton && (
          <Link href='/cart'>
            <a>
              <button className='fixed right-5 left-5 bottom-5 z-10 flex items-center justify-center gap-x-2 md:static'>
                {/* Cart icon */}
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

        {user ? (
          <button onClick={logout}>Sign out</button>
        ) : (
          <Link href='/signin'>
            <a>Sign in</a>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navigation
