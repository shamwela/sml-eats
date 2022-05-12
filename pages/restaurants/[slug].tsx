import Head from 'components/Head'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'

const prisma = new PrismaClient()

export const getStaticPaths = async () => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      slug: true,
    },
  })
  const slugs = restaurants.map(({ slug }) => slug)
  const paths = slugs.map((slug) => ({
    params: {
      slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: any) => {
  const restaurants = await prisma.restaurant.findMany({
    include: { items: true },
  })
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
        {items.map(
          ({ name, path, imageSource, imageWidth, imageHeight, basePrice }) => {
            return (
              <Link key={path} href={path}>
                <a>
                  <div className='flex flex-col'>
                    <Image
                      alt={name}
                      src={imageSource}
                      width={imageWidth}
                      height={imageHeight}
                    />
                    <span>{name}</span>
                    <span>${basePrice}</span>
                  </div>
                </a>
              </Link>
            )
          }
        )}
      </ItemContainer>
    </>
  )
}

export default RestaurantPage
