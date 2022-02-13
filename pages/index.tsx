import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'ui/ItemContainer'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

type CategoryImageProperty = {
  name: string
  imageSource: StaticImageData
}

const Home = ({
  restaurants,
  categoryImageProperties,
}: {
  restaurants: Restaurant[]
  categoryImageProperties: CategoryImageProperty[]
}) => {
  return (
    <>
      <Head title='Home' description='SML Eats home page' />

      <button>
        <Link href='/search'>
          <a>Search</a>
        </Link>
      </button>

      <h2>Popular near you</h2>
      <ItemContainer>
        {restaurants?.map(({ name, slug, rating, imageSource }) => {
          return (
            <Link key={slug} href={`/restaurants/${slug}`}>
              <a>
                <section className='flex flex-col'>
                  <Image src={imageSource} alt={name} placeholder='blur' />
                  <span>{name}</span>
                  <span>⭐ {rating}</span>
                </section>
              </a>
            </Link>
          )
        })}
      </ItemContainer>

      <h2>Explore by category</h2>
      <ItemContainer>
        {categoryImageProperties.map(({ name, imageSource }) => {
          const href = '/search?query=' + name.toLowerCase()
          return (
            <Link href={href} key={name}>
              <a>
                <section className='flex h-20 rounded-lg bg-light-primary p-4'>
                  <span>{name}</span>
                  <Image
                    alt={name}
                    src={imageSource}
                    className='object-contain'
                  />
                </section>
              </a>
            </Link>
          )
        })}
      </ItemContainer>
    </>
  )
}

export default Home
