import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { categories } from 'data/categories'
import { restaurants } from 'data/restaurants'
import { StarIcon } from '@heroicons/react/solid'

const Home = () => {
  return (
    <>
      <Head title='Order food online' />

      <h2>Explore by category</h2>
      <ItemContainer>
        {categories.map(({ name, imageSource }) => {
          const href = '/search?query=' + name.toLowerCase()
          return (
            <Link href={href} key={name}>
              <a>
                <section className='flex h-20 rounded-lg bg-light-elevation p-4 dark:bg-dark-elevation'>
                  <span className='self-center'>{name}</span>
                  <Image
                    alt={name}
                    src={imageSource}
                    placeholder='blur'
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
        {restaurants.map(({ name, slug, rating, imageSource }) => {
          return (
            <Link key={slug} href={`/restaurants/${slug}`}>
              <a>
                <section className='flex flex-col gap-y-1'>
                  <Image src={imageSource} alt={name} placeholder='blur' />

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
        })}
      </ItemContainer>
    </>
  )
}

export default Home
