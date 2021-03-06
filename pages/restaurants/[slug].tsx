import Head from 'components/Head'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { prisma } from 'prisma/prismaClient'
import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import FavoriteButtonArea from 'components/FavoriteButtonArea'

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
