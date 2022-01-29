import Link from 'next/link'

const Home = () => {
  return (
    <>
      <h1>SML Eats</h1>
      <Link href='/store/the-pizza-company'>
        <a>The Pizza Company</a>
      </Link>
    </>
  )
}

export default Home
