import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/solid'
import { PrismaClient } from '@prisma/client'
import { InferGetStaticPropsType } from 'next'

const prisma = new PrismaClient()

export const getStaticProps = async () => {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      category: true,
    },
  })

  return {
    props: { restaurants },
  }
}

const Home = ({
  restaurants,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head title='Order food online' />
      <h2>Explore by category</h2>
      <ItemContainer>
        {restaurants.map(({ category }) => {
          const { id, name, imageSource, imageWidth, imageHeight } = category
          const href = '/search?query=' + name.toLowerCase()

          return (
            <Link href={href} key={id}>
              <a>
                <section className='flex h-20 rounded-lg bg-light-elevation p-4 dark:bg-dark-elevation justify-center'>
                  <span className='self-center'>{name}</span>
                  <Image
                    alt={name}
                    src={imageSource}
                    width={imageWidth}
                    height={imageHeight}
                    priority
                    className='object-contain'
                  />
                </section>
              </a>
            </Link>
          )
        })}
      </ItemContainer>

      <h2>Popular near you</h2>
      <ItemContainer>
        {restaurants.map(
          ({
            id,
            name,
            slug,
            rating,
            imageSource,
            imageWidth,
            imageHeight,
          }) => {
            return (
              <Link key={id} href={'/restaurants/' + slug}>
                <a>
                  <section className='flex flex-col gap-y-1'>
                    <Image
                      alt={name}
                      src={imageSource}
                      width={imageWidth}
                      height={imageHeight}
                      priority
                    />
                    <div className='flex justify-between items-start'>
                      <span>{name}</span>
                      <div className='flex items-center'>
                        <StarIcon />
                        <span>{rating}</span>
                      </div>
                    </div>
                  </section>
                </a>
              </Link>
            )
          }
        )}
      </ItemContainer>
    </>
  )
}

export default Home
