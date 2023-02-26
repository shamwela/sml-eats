import Head from 'components/Head'
import Link from 'next/link'
import { useIsEnglish } from 'hooks/useIsEnglish'

const Custom404 = () => {
  const isEnglish = useIsEnglish()

  return (
    <>
      <Head title='Page not found' />
      <div className='flex flex-col items-center gap-y-[inherit]'>
        <h1>
          {isEnglish
            ? 'Sorry, page not found.'
            : 'ဝမ်းနည်းပါတယ်၊ စာမျက်နှာကို ရှာမတွေ့ပါ။'}
        </h1>
        <Link href='/' className='button'>
          {isEnglish ? 'Go to homepage' : 'ပင်မစာမျက်နှာဆီသွားမယ်'}
        </Link>
      </div>
    </>
  )
}

export default Custom404
