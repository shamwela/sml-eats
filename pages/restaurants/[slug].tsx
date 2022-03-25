import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'components/ItemContainer'
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
  const { name: restaurantName, slug, rating, items } = restaurant

  const favorite = () => {
    fetch('/api/restaurants', {
      method: 'POST',
      body: JSON.stringify({ slug }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('Favorited')
  }

  return (
    <>
      <Head title={restaurantName} />
      <h1>{restaurantName}</h1>
      <button onClick={favorite}>Favorite</button>
      <span>
        <strong>Rating</strong>: {rating}
      </span>
      <ItemContainer>
        {items.map(({ name, path, imageSource, basePrice }) => {
          return (
            <Link key={path} href={path}>
              <a>
                <section className='flex flex-col'>
                  <Image alt={name} src={imageSource} placeholder='blur' />
                  <span>{name}</span>
                  <span>${basePrice}</span>
                </section>
              </a>
            </Link>
          )
        })}
      </ItemContainer>
    </>
  )
}

export default RestaurantPage
