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

      <section className='flex flex-col gap-y-4'>
        {restaurants?.map(({ name, slug }) => {
          return (
            <Link key={slug} href={`/restaurants/${slug}`}>
              <a>{name}</a>
            </Link>
          )
        })}
      </section>
    </>
  )
}

export default Home
