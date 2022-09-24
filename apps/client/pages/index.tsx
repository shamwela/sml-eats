import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import RestaurantImageGroup from 'components/RestaurantImageGroup'
import axios from 'utilities/axios'
import type { Category } from 'types/category'
import type { Restaurant } from 'types/restaurant'
import type { Test } from '../../server/index'

export const getStaticProps = async () => {
  const categoryResponse = await axios.get('/categories')
  const categories: Category[] = categoryResponse.data

  const restaurantResponse = await axios.get('/restaurants')
  const restaurants: Restaurant[] = restaurantResponse.data

  return {
    props: {
      categories,
      restaurants,
    },
  }
}

const Home = ({
  categories,
  restaurants,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const test: Test = { message: 'test' }
  console.log(test)

  return (
    <>
      <Head title='Order food online' />
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
