import Head from 'components/Head'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { type InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import FavoriteButtonArea from 'components/FavoriteButtonArea'
import axios from 'utilities/axios'
import { type nestedSlug } from 'types/nestedSlug'
import { type NestedRestaurant } from 'types/nestedRestaurant'

export const getStaticPaths = async () => {
  const slugResponse = await axios.get('/slugs')
  const slugs: nestedSlug[] = await slugResponse.data
  const restaurantSlugs = slugs.map(({ slug }) => slug)
  
  type Path = {
    params: {
      slug: string
    }
    locale: string
  }
  let paths: Path[] = []
  restaurantSlugs.forEach((slug) => {
    paths.push({ params: { slug }, locale: 'en' })
    paths.push({ params: { slug }, locale: 'mm' })
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

  return {
    props: {
      restaurant,
    },
  }
}

const RestaurantPage = ({
  restaurant,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!restaurant) {
    return <p>Sorry. Couldn't find that restaurant.</p>
  }
  const { id: restaurantId, name: restaurantName, rating, items } = restaurant

  return (
    <>
      <Head title={restaurantName} />
      <h1>{restaurantName}</h1>
      <FavoriteButtonArea restaurantId={restaurantId} />
      <span>
        <strong>Rating</strong>: {rating}
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
              <a>
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
              </a>
            </Link>
          )
        )}
      </ItemContainer>
    </>
  )
}

export default RestaurantPage
