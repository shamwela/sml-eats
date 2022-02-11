import Head from 'components/Head'
import Image from 'next/image'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

const Home = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const categories = restaurants.map(({ category }) => category)

  return (
    <>
      <Head title='Home' description='SML Eats home page' />

      <button>
        <Link href='/search'>
          <a>Search</a>
        </Link>
      </button>

      <h2>Restaurants</h2>
      {restaurants?.map(({ name, slug, rating, imageProperties }) => {
        return (
          <Link key={slug} href={`/restaurants/${slug}`}>
            <a>
              <section className='flex flex-col'>
                <div className='h-36 overflow-hidden'>
                  <Image
                    src={imageProperties.src}
                    alt={name}
                    placeholder='blur'
                    className='object-cover'
                  />
                </div>

                <span className='text-3xl'>{name}</span>

                <span>⭐ {rating}</span>
              </section>
            </a>
          </Link>
        )
      })}

      <h2>Explore by category</h2>
      {categories.map((category) => {
        const href = '/search?query=' + category.toLowerCase()

        return (
          <Link href={href} key={category}>
            <a>{category}</a>
          </Link>
        )
      })}
    </>
  )
}

export default Home
