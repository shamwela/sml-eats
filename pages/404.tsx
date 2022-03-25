import Head from 'components/Head'
import Link from 'next/link'

const Custom404 = () => {
  return (
    <>
      <Head title='Page not found' />
      <div className='flex flex-col items-center gap-y-[inherit]'>
        <h1>Sorry, page not found.</h1>
        <Link href='/'>
          <a className='button'>Find food</a>
        </Link>
      </div>
    </>
  )
}

export default Custom404
