import Head from 'components/Head'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <Head
        title='SML Eats'
        description='SML Eats'
        imageUrl='/images/seafood-cocktail.jpeg'
      />
      <h1>SML Eats</h1>
      <Link href='/store/the-pizza-company'>
        <a>The Pizza Company</a>
      </Link>
    </>
  )
}

export default Home
