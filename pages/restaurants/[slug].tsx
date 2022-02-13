import type { Restaurant } from 'types/restaurant'
import RestaurantLayout from 'layouts/RestaurantLayout'
import { restaurants } from 'data/restaurants'

export const getStaticPaths = () => {
  const paths = restaurants.map(({ slug }) => ({
    params: {
      slug,
    },
  }))

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
  return <RestaurantLayout restaurant={restaurant} />
}

export default RestaurantPage
