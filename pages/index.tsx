import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { prisma } from 'prisma/prismaClient'
import { InferGetStaticPropsType } from 'next'
import RestaurantImageGroup from 'components/RestaurantImageGroup'

export const getStaticProps = async () => {
  const categories = await prisma.category.findMany()
  const restaurants = await prisma.restaurant.findMany()

  return {
    props: { categories, restaurants },
  }
}

const Home = ({
  categories,
  restaurants,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head title='Order food online' />
      <button
        type='button'
        onClick={() => {
          throw new Error('Sentry Frontend Error')
        }}
      >
        Throw error
      </button>
      <h2>Explore by category</h2>
      <ItemContainer>
        {categories.map(
          ({ id, name, imageSource, imageWidth, imageHeight }) => {
            const href = '/search?query=' + name.toLowerCase()

            return (
              <Link href={href} key={id}>
                <a>
                  <div className='flex h-20 rounded-lg bg-light-elevation p-4 dark:bg-dark-elevation justify-center'>
                    <span className='self-center'>{name}</span>
                    <Image
                      alt={name}
                      src={imageSource}
                      width={imageWidth}
                      height={imageHeight}
                      priority
                      className='object-contain'
                    />
                  </div>
                </a>
              </Link>
            )
          }
        )}
      </ItemContainer>

      <h2>Popular near you</h2>
      <ItemContainer>
        {restaurants.map((restaurant) => (
          <RestaurantImageGroup {...restaurant} key={restaurant.id} />
        ))}
      </ItemContainer>
    </>
  )
}

export default Home
