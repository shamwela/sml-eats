import Link from 'next/link'
import { useIsEnglish } from 'hooks/useIsEnglish'

export const LanguageChanger = () => {
  const isEnglish = useIsEnglish()
  const text = isEnglish ? 'မြန်မာစာသုံးမယ်' : 'Use English'

  return (
    <Link href='/menu' locale={isEnglish ? 'mm' : 'en'} className='button'>
      {text}
    </Link>
  )
}
