import Head from 'components/Head'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { InferGetStaticPropsType } from 'next'
import Image from 'components/Image'

const prisma = new PrismaClient()

export const getStaticPaths = async () => {
  const restaurants = await prisma.restaurant.findMany()
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

export const getStaticProps = async (context: any) => {
  const currentPageSlug = context.params.slug
  const restaurants = await prisma.restaurant.findMany({
    include: { items: true },
  })
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
    return <p>Sorry. This restaurant isn't found.</p>
  }

  const { name: restaurantName, rating, items } = restaurant

  return (
    <>
      <Head title={restaurantName} />
      <h1>{restaurantName}</h1>
      <span>
        <strong>Rating</strong>: {rating}
      </span>
      <ItemContainer>
        {items.map(({ name, path, imageSource, basePrice }) => {
          return (
            <Link key={path} href={path}>
              <a>
                <section className='flex flex-col'>
                  <Image alt={name} src={imageSource} />
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
