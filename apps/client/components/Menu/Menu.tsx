import { MenuIcon, XIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ThemeButton from 'components/ThemeButton'
import { useSignedIn } from 'hooks/useSignedIn'
import SignOutButton from 'components/SignOutButton'
import type { EmptyCart } from 'types/EmptyCart'

const Menu = ({ emptyCart }: { emptyCart: EmptyCart }) => {
  const [showMenu, setShowMenu] = useState(false)
  const { pathname } = useRouter()
  // If the user goes to another page, close the menu
  useEffect(() => setShowMenu(false), [pathname])

  const { signedIn, loading } = useSignedIn()
  if (loading) {
    return null
  }

  return (
    <>
      <MenuIcon
        onClick={() => setShowMenu(true)}
        aria-label='Navigation menu'
        className='cursor-pointer'
      />
      {showMenu && (
        <div className='fixed inset-0 bg-white dark:bg-gray-900 z-20 p-4 flex flex-col gap-y-6 max-w-md'>
          <XIcon
            onClick={() => setShowMenu(false)}
            className='cursor-pointer'
          />
          {!signedIn && (
            <>
              <Link href='/signup'>
                <a>Sign up</a>
              </Link>
              <Link href='/signin'>
                <a>Sign in</a>
              </Link>
            </>
          )}
          {signedIn && (
            <>
              <Link href='/delivery-details'>
                <a>Delivery details</a>
              </Link>
              <Link href='/favorited-restaurants'>
                <a>Favorites</a>
              </Link>
              <SignOutButton emptyCart={emptyCart} />
            </>
          )}
          <ThemeButton />
        </div>
      )}
    </>
  )
}

export default Menu
