import Head from 'components/Head'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

const Home = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const categories = restaurants.map(({ category }) => category)

  return (
    <>
      <Head
        title='Home'
        description='SML Eats home page'
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
        {categories.map((category) => {
          const href = '/search?query=' + category.toLowerCase()

          return (
            <Link href={href} key={category}>
              <a>{category}</a>
            </Link>
          )
        })}
      </section>
    </>
  )
}

export default Home
