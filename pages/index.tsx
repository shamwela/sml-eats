import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/solid'
import { prisma } from 'prisma/prismaClient'
import { InferGetStaticPropsType } from 'next'

export const getStaticProps = async () => {
  const categories = await prisma.category.findMany()
  const restaurants = await prisma.restaurant.findMany()

  return {
    props: { categories, restaurants },
  }
}

const Home = ({
  categories,
  restaurants,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head title='Order food online' />
      <h2>Explore by category</h2>
      <ItemContainer>
        {categories.map(
          ({ id, name, imageSource, imageWidth, imageHeight }) => {
            const href = '/search?query=' + name.toLowerCase()

            return (
              <Link href={href} key={id}>
                <a>
                  <div className='flex h-20 rounded-lg bg-light-elevation p-4 dark:bg-dark-elevation justify-center'>
                    <span className='self-center'>{name}</span>
                    <Image
                      alt={name}
                      src={imageSource}
                      width={imageWidth}
                      height={imageHeight}
                      priority
                      className='object-contain'
                    />
                  </div>
                </a>
              </Link>
            )
          }
        )}
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
