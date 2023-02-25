import { MenuIcon, XIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ThemeButton from 'components/ThemeButton'
import { useSignedIn } from 'hooks/useSignedIn'
import SignOutButton from 'components/SignOutButton'

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { pathname, locale } = useRouter()
  const isEnglish = locale === 'en'
  // If the user goes to another page, close the menu
  useEffect(() => setShowMenu(false), [pathname])
  const { signedIn } = useSignedIn()

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
          {signedIn ? (
            <>
              <Link href='/delivery-details'>
                <a>{isEnglish ? 'Delivery details' : 'ပို့ဆောင်မှုအသေးစိတ်'}</a>
              </Link>
              <Link href='/favorited-restaurants'>
                <a>{isEnglish ? 'Favorites' : 'အကြိုက်ဆုံးများ'}</a>
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href='/signup'>
                <a>{isEnglish ? 'Sign up' : 'အကောင့်ဖွင့်မယ်'}</a>
              </Link>
              <Link href='/signin'>
                <a>{isEnglish ? 'Sign in' : 'အကောင့်ဝင်မယ်'}</a>
              </Link>
            </>
          )}
          <ThemeButton />
        </div>
      )}
    </>
  )
}

export default Menu
