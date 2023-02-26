import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import RestaurantImageGroup from 'components/RestaurantImageGroup'
import axios from 'utilities/axios'
import { type Category } from 'types/category'
import { type Restaurant } from 'types/restaurant'
import { type InferGetStaticPropsType } from 'next'

export const getStaticProps = async (context: any) => {
  const { data: categories } = await axios.get<Category[]>('/categories')
  const { data: restaurants } = await axios.get<Restaurant[]>('/restaurants')
  const { locale } = context
  const isEnglish = locale === 'en'
  const props = {
    categories,
    restaurants,
    isEnglish,
  }
  return { props }
}

const Home = ({
  categories,
  restaurants,
  isEnglish,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head
        title={
          isEnglish ? 'Order food online' : 'အွန်လိုင်းမှာ အစားအသောက်မှာယူပါ'
        }
      />
      <h2>{isEnglish ? 'Explore by category' : 'အမျိုးအစားအလိုက်ရှာမယ်'}</h2>
      <ItemContainer>
        {categories.map(
          ({
            id,
            name,
            nameInMyanmar,
            imageSource,
            imageWidth,
            imageHeight,
          }) => {
            const href = '/search?query=' + name.toLowerCase()

            return (
              <Link href={href} key={id}>
                <div className='flex h-20 rounded-lg bg-light-elevation p-4 dark:bg-dark-elevation justify-between'>
                  <span className='self-center'>
                    {isEnglish ? name : nameInMyanmar}
                  </span>
                  <Image
                    alt={isEnglish ? name : nameInMyanmar}
                    src={imageSource}
                    width={imageWidth}
                    height={imageHeight}
                    priority
                    className='object-contain w-auto'
                  />
                </div>
              </Link>
            )
          }
        )}
      </ItemContainer>

      <h2>{isEnglish ? 'Popular near you' : 'ရောင်းကောင်းသောဆိုင်များ'}</h2>
      <ItemContainer>
        {restaurants.map((restaurant) => (
          <RestaurantImageGroup {...restaurant} key={restaurant.id} />
        ))}
      </ItemContainer>
    </>
  )
}

export default Home
