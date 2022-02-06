import Head from 'components/Head'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

const Home = ({ restaurants }: { restaurants: Restaurant[] }) => {
  return (
    <>
      <Head
        title='SML Eats'
        description='SML Eats'
        imageUrl='/images/seafood-cocktail.jpeg'
      />
      <h1>SML Eats</h1>
      {restaurants?.map(({ name, slug }) => {
        return (
          <Link key={slug} href={`/restaurant/${slug}`}>
            <a>{name}</a>
          </Link>
        )
      })}
    </>
  )
}

export default Home
