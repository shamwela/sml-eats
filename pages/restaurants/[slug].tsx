import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'ui/ItemContainer'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'
import { restaurants } from 'data/restaurants'

export const getStaticPaths = () => {
  const paths = restaurants.map(({ slug }) => {
    const path = {
      params: {
        slug,
      },
    }

    return path
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = (context: { params: { slug: string } }) => {
  const currentPageSlug = context.params.slug
  const restaurant = restaurants.find(({ slug }) => slug === currentPageSlug)

  return {
    props: {
      restaurant,
    },
  }
}

type RestaurantPageProps = {
  restaurant: Restaurant
}

const RestaurantPage = ({ restaurant }: RestaurantPageProps) => {
  const { name: restaurantName, items } = restaurant

  return (
    <>
      <Head title={restaurantName} />
      <h1>{restaurantName}</h1>
      <ItemContainer>
        {items.map(({ name, path, imageSource }) => {
          return (
            <Link key={path} href={path}>
              <a>
                <Image alt={name} src={imageSource} placeholder='blur' />
                <span>{name}</span>
              </a>
            </Link>
          )
        })}
      </ItemContainer>
    </>
  )
}

export default RestaurantPage
