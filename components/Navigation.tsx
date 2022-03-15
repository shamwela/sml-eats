import { useEffect, useState } from 'react'
import { auth, signOut } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import type { CartItem } from 'types/cartItem'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import {
  MenuAlt4Icon,
  XIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/solid'

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
  const [showMenu, setShowMenu] = useState(false)
  const openMenu = () => setShowMenu(true)
  const closeMenu = () => setShowMenu(false)

  return (
    <nav className='top-0 z-10 bg-white py-4 dark:bg-gray-900 md:sticky'>
      <div className='mx-auto flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-2'>
        <MenuAlt4Icon onClick={openMenu} className='cursor-pointer' />
        {showMenu && (
          <div className='fixed inset-0 bg-gray-900 z-20 p-4 flex flex-col gap-y-4'>
            <XIcon onClick={closeMenu} className='cursor-pointer' />

            <Link href='/profile'>
              <a onClick={closeMenu}>Profile</a>
            </Link>
          </div>
        )}

        <Link href='/'>
          <a className='text-xl font-bold md:text-4xl'>SML Eats</a>
        </Link>

        {pathname !== '/search' && (
          <Link href='/search'>
            <a aria-label='Search'>
              <SearchIcon />
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
                <ShoppingCartIcon />
                Cart • {totalQuantity}
              </button>
            </a>
          </Link>
        )}

        {user ? (
          <button onClick={signOut}>Sign out</button>
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
