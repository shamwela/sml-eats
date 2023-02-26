import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import { useAppSelector } from 'store/hooks'

const Navigation = () => {
  const cart = useAppSelector((store) => store.cart)
  const totalQuantity = cart.reduce(
    (previousQuantity, cartItem) => previousQuantity + cartItem.quantity,
    0
  )

  const { pathname, locale } = useRouter()
  const isEnglish = locale === 'en'
  const isNotCartPage = pathname !== '/cart'
  const cartExists = cart.length > 0

  // This is the code to fix this issue (https://github.com/vercel/next.js/discussions/35773).
  const [isSSR, setIsSSR] = useState(true)
  useEffect(() => setIsSSR(false), [])

  const showCartLink = isNotCartPage && cartExists && !isSSR

  return (
    <nav className='top-0 z-10 bg-white py-4 dark:bg-gray-900 md:sticky'>
      <div className='mx-auto flex max-w-4xl flex-wrap items-center gap-x-8 gap-y-2'>
        <Link href='/' className='text-4xl md:text-5xl font-logo'>
          SML Eats
        </Link>
        <Link href='/search' aria-label='Search'>
          <MagnifyingGlassIcon />
        </Link>
        <Link href='/menu'>{isEnglish ? 'Menu' : 'မန်နူး'}</Link>
        {showCartLink && (
          <Link
            href='/cart'
            className='fixed right-5 left-5 bottom-5 z-10 flex items-center justify-center gap-x-2 md:static button'
            data-cy='cart-button'
          >
            <ShoppingCartIcon />
            <span>
              {isEnglish ? 'Cart' : 'ပစ္စည်းများ'} • {totalQuantity}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navigation
