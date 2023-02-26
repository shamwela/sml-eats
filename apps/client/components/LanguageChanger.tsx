import Link from 'next/link'
import { useRouter } from 'next/router'

export const LanguageChanger = () => {
  const { locale } = useRouter()
  const isEnglish = locale === 'en'
  const text = isEnglish ? 'မြန်မာစာသုံးမယ်' : 'Use English'

  return (
    <Link href='/menu' locale={isEnglish ? 'mm' : 'en'} className='button'>
      {text}
    </Link>
  )
}
