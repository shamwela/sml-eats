import Head from 'components/Head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ThemeButton from 'components/ThemeButton'
import { useSignedIn } from 'hooks/useSignedIn'
import SignOutButton from 'components/SignOutButton'
import { LanguageChanger } from 'components/LanguageChanger'

const Menu = () => {
  const { locale } = useRouter()
  const isEnglish = locale === 'en'
  const { signedIn } = useSignedIn()
  const menuText = isEnglish ? 'Menu' : 'မန်နူး'

  return (
    <>
      <Head title={menuText} />
      <div className='flex flex-col gap-y-8'>
        <h1>{menuText}</h1>
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
        <LanguageChanger />
      </div>
    </>
  )
}

export default Menu
