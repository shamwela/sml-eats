import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'
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
      <Bars2Icon
        onClick={() => setShowMenu(true)}
        aria-label='Navigation menu'
        className='cursor-pointer'
      />
      {showMenu && (
        <div className='fixed inset-0 bg-white dark:bg-gray-900 z-20 p-4 flex flex-col gap-y-6 max-w-md'>
          <XMarkIcon
            onClick={() => setShowMenu(false)}
            className='cursor-pointer'
          />
          {signedIn ? (
            <>
              <Link href='/delivery-details'>
                {isEnglish ? 'Delivery details' : 'ပို့ဆောင်မှုအသေးစိတ်'}
              </Link>
              <Link href='/favorited-restaurants'>
                {isEnglish ? 'Favorites' : 'အကြိုက်ဆုံးများ'}
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href='/signup'>
                {isEnglish ? 'Sign up' : 'အကောင့်ဖွင့်မယ်'}
              </Link>
              <Link href='/signin'>
                {isEnglish ? 'Sign in' : 'အကောင့်ဝင်မယ်'}
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
