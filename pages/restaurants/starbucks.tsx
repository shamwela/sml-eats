import Head from 'components/Head'
import Image from 'next/image'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

const Starbucks = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const starbucks = restaurants.find(
    (restaurant) => restaurant.slug === 'starbucks'
  )

  return (
    <>
      <Head title='Starbucks' description='Starbucks' />
      <Image alt='Starbucks' src={starbucks?.imageSource || ''} />
      <h1>Starbucks</h1>
      <article className='flex flex-col gap-y-4'>
        {starbucks?.items.map(({ name, slug, imageSource }) => {
          const href = '/restaurants/starbucks/' + slug

          return (
            <Link key={name} href={href}>
              <a>
                <Image alt={name} src={imageSource} placeholder='blur' />
                <span>{name}</span>
              </a>
            </Link>
          )
        })}
      </article>
    </>
  )
}

export default Starbucks
