import CustomHead from 'components/Head'
import Link from 'next/link'

const Custom404 = () => {
  return (
    <>
      <CustomHead title='Page not found' description='Page not found' />
      <h1>Sorry, page not found.</h1>
      <button>
        <Link href='/'>
          <a>Find food</a>
        </Link>
      </button>
    </>
  )
}

export default Custom404
