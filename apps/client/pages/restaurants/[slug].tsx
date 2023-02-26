import Head from 'components/Head'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { type InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import FavoriteButtonArea from 'components/FavoriteButtonArea'
import axios from 'utilities/axios'
import { type nestedSlug } from 'types/nestedSlug'
import { type NestedRestaurant } from 'types/nestedRestaurant'
import { locales } from 'utilities/locales'

export const getStaticPaths = async () => {
  const { data: slugs } = await axios.get<nestedSlug[]>('/slugs')
  const restaurantSlugs = slugs.map(({ slug }) => slug)

  type Path = {
    params: {
      slug: string
    }
    locale: string
  }
  let paths: Path[] = []
  restaurantSlugs.forEach((slug) => {
    // Add paths for each locale
    locales.forEach((locale) => {
      const path = {
        params: {
          slug,
        },
        locale,
      }
      paths.push(path)
    })
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: any) => {
  const restaurantResponse = await axios.get('/restaurants', {
    params: {
      includeItems: true,
    },
  })
  const restaurants: NestedRestaurant[] = restaurantResponse.data
  const currentPageSlug = context.params.slug
  const restaurant = restaurants.find(({ slug }) => slug === currentPageSlug)
  if (!restaurant) {
    throw new Error('Restaurant is not found.')
  }
  const { locale } = context
  const isEnglish = locale === 'en'

  return {
    props: {
      restaurant,
      isEnglish,
    },
  }
}

const RestaurantPage = ({
  restaurant,
  isEnglish,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { id: restaurantId, name: restaurantName, rating, items } = restaurant

  return (
    <>
      <Head title={restaurantName} />
      <h1>{restaurantName}</h1>
      <FavoriteButtonArea restaurantId={restaurantId} />
      <span>
        {isEnglish ? 'Rating' : 'အဆင့်သတ်မှတ်ချက်'}: {rating}
      </span>
      <ItemContainer>
        {items.map(
          ({
            id,
            name,
            path,
            imageSource,
            imageWidth,
            imageHeight,
            basePrice,
          }) => (
            <Link key={id} href={path}>
              <div className='flex flex-col'>
                <Image
                  alt={name}
                  src={imageSource}
                  width={imageWidth}
                  height={imageHeight}
                  priority
                />
                <span>{name}</span>
                <span>${basePrice}</span>
              </div>
            </Link>
          )
        )}
      </ItemContainer>
    </>
  )
}

export default RestaurantPage
