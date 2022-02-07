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
        {restaurants?.map(({ name, slug, rating }) => {
          return (
            <section key={slug} className='flex justify-between'>
              <Link href={`/restaurants/${slug}`}>
                <a>{name}</a>
              </Link>

              <span>⭐ {rating}</span>
            </section>
          )
        })}
      </section>
    </>
  )
}

export default Home
