import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'components/ItemContainer'
import Link from 'next/link'
import { categoryImageProperties } from 'data/categoryImageProperties'
import { restaurants } from 'data/restaurants'

const Home = () => {
  return (
    <>
      <Head title='Order food online' />

      <h2>Explore by category</h2>
      <ItemContainer>
        {categoryImageProperties.map(({ name, imageSource }) => {
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
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
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
