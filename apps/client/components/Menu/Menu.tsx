import { MenuIcon, XIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ThemeButton from 'components/ThemeButton'
import { useSignedIn } from 'hooks/useSignedIn'

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const openMenu = () => setShowMenu(true)
  const closeMenu = () => setShowMenu(false)

  const { pathname } = useRouter()
  // If the user goes to another page, close the menu
  useEffect(() => closeMenu(), [pathname])

  const { signedIn, loading } = useSignedIn()

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
          <ThemeButton />
          {signedIn && !loading ? (
            <>
              <Link href='/delivery-details'>
                <a>Delivery details</a>
              </Link>
              <Link href='/favorited-restaurants'>
                <a>Favorites</a>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  )
}

export default Menu
