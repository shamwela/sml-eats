import Head from 'components/Head'
import { useIsEnglish } from 'hooks/useIsEnglish'
import { useProtectedRoute } from 'hooks/useProtectedRoute'
import Link from 'next/link'

const Checkout = () => {
  useProtectedRoute()
  const isEnglish = useIsEnglish()
  const title = isEnglish ? 'Checkout' : 'ငွေရှင်းမယ်'

  return (
    <>
      <Head title={title} />
      <section className='flex flex-col gap-y-4 items-center'>
        <p>
          {isEnglish
            ? 'Checkout feature is not implemented.'
            : 'ငွေရှင်းတဲ့featureကို မလုပ်ထားပါ။'}
        </p>
        <Link href='/' className='button'>
          {isEnglish ? 'Go to the home page' : 'ပင်မစာမျက်နှာကိုသွားမယ်'}
        </Link>
      </section>
    </>
  )
}

export default Checkout
