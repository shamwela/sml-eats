import Head from 'components/Head'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

const Home = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const categories = restaurants.map(({ category }) => category)

  return (
    <>
      <Head
        title='SML Eats'
        description='SML Eats'
        imageUrl='/images/seafood-cocktail.jpeg'
      />

      <section className='flex flex-col gap-y-4'>
        <Link href='/search'>
          <a>Search</a>
        </Link>

        <h2>Restaurants</h2>
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

      <h2>Explore by category</h2>
      <section className='flex flex-col gap-y-4'>
        {categories.map((category) => (
          <Link href='/' key={category}>
            <a>{category}</a>
          </Link>
        ))}
      </section>
    </>
  )
}

export default Home
