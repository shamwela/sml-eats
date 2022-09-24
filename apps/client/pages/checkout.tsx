import Head from 'components/Head'
import { useProtectedRoute } from 'hooks/useProtectedRoute'
import Link from 'next/link'

const Checkout = () => {
  useProtectedRoute()

  return (
    <>
      <Head title='Checkout' />
      <section className='flex flex-col gap-y-4 items-center'>
        <h1>This is a fake app. So, you can't checkout.</h1>
        <Link href='/'>
          <a className='button'>Go back to home</a>
        </Link>
      </section>
    </>
  )
}

export default Checkout
