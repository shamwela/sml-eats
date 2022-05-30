import { useEffect, useState, useMemo, useContext } from 'react'
import type { CartItem } from 'types/cartItem'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import {
  MenuIcon,
  XIcon,
  ShoppingCartIcon,
  SearchIcon,
} from '@heroicons/react/solid'
import { AuthenticationContext } from 'contexts/authentication'
import { signIn, signOut } from 'utilities/firebase'

const Navigation = ({
  cart,
  emptyCart,
}: {
  cart: CartItem[]
  emptyCart: () => void
}) => {
  const { theme, setTheme } = useTheme()
  const totalQuantity = useMemo(
    () =>
      cart.reduce(
        (previousQuantity, cartItem) => previousQuantity + cartItem.quantity,
        0
      ),
    [cart]
  )
  const { pathname } = useRouter()
  const isNotCartPage = pathname !== '/cart'
  const cartExists = cart.length > 0

  // This is the code to fix this issue (https://github.com/vercel/next.js/discussions/35773).
  const [isSSR, setIsSSR] = useState(true)
  useEffect(() => setIsSSR(false), [])

  const showCartButton = isNotCartPage && cartExists && !isSSR

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const { user, userLoading, userError } = useContext(AuthenticationContext)
  if (userError) {
    alert(userError.message)
  }
  const [showMenu, setShowMenu] = useState(false)
  const openMenu = () => setShowMenu(true)
  const closeMenu = () => setShowMenu(false)
  useEffect(() => closeMenu(), [pathname])
  const handleSignOut = () => {
    emptyCart()
    closeMenu()
    signOut()
  }

  return (
    <nav className='top-0 z-10 bg-white py-4 dark:bg-gray-900 md:sticky'>
      <div className='mx-auto flex max-w-4xl flex-wrap items-center gap-x-8 gap-y-2'>
        <MenuIcon
          onClick={openMenu}
          aria-label='Navigation menu'
          className='cursor-pointer'
        />
        {showMenu && (
          <div className='fixed inset-0 bg-white dark:bg-gray-900 z-20 p-4 flex flex-col gap-y-6 max-w-md'>
            <XIcon onClick={closeMenu} className='cursor-pointer' />
            <Link href='/delivery-details'>
              <a>Delivery details</a>
            </Link>
            {user && (
              <Link href='/favorited-restaurants'>
                <a>Favorites</a>
              </Link>
            )}
            <button onClick={toggleTheme}>Change theme</button>
            {user && <button onClick={handleSignOut}>Sign out</button>}
          </div>
        )}
        <Link href='/'>
          <a className='text-4xl md:text-5xl font-logo'>SML Eats</a>
        </Link>
        <Link href='/search'>
          <a aria-label='Search'>
            <SearchIcon />
          </a>
        </Link>
        {showCartButton && (
          <Link href='/cart'>
            <a className='fixed right-5 left-5 bottom-5 z-10 flex items-center justify-center gap-x-2 md:static button'>
              <ShoppingCartIcon />
              <span>Cart • {totalQuantity}</span>
            </a>
          </Link>
        )}
        {!userLoading && !user && <button onClick={signIn}>Sign in</button>}
      </div>
    </nav>
  )
}

export default Navigation
