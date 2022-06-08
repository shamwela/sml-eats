import { MenuIcon, XIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { signOut } from 'utilities/firebase'
import Link from 'next/link'
import type { User } from 'firebase/auth'

const Menu = ({
  emptyCart,
  user,
}: {
  emptyCart: () => void
  user: User | null | undefined
}) => {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const [showMenu, setShowMenu] = useState(false)
  const openMenu = () => setShowMenu(true)
  const closeMenu = () => setShowMenu(false)

  const { pathname } = useRouter()
  useEffect(() => closeMenu(), [pathname])

  const handleSignOut = () => {
    emptyCart()
    closeMenu()
    signOut()
  }

  return (
    <>
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
    </>
  )
}

export default Menu
