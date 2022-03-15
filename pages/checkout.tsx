import Head from 'components/Head'
import Link from 'next/link'

const Checkout = () => {
  return (
    <>
      <Head title='Checkout' />
      <section className='flex flex-col gap-y-4'>
        <h1>This is a fake app. So, you can't checkout.</h1>
        <Link href='/'>
          <a>Go back to home</a>
        </Link>
      </section>
    </>
  )
}

export default Checkout
