import Head from 'components/Head'
import Link from 'next/link'

const Custom404 = () => {
  return (
    <>
      <Head title='Page not found' />
      <h1>Sorry, page not found.</h1>
      <Link href='/'>
        <a>Find food</a>
      </Link>
    </>
  )
}

export default Custom404
