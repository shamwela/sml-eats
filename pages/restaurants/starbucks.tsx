import Head from 'components/Head'
import Image from 'next/image'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

const Starbucks = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const starbucks = restaurants.find(
    (restaurant) => restaurant.slug === 'starbucks'
  )
  const imageSource = starbucks?.imageSource || ''

  return (
    <>
      <Head title='Starbucks' description='Starbucks' />
      <Image alt='Starbucks' src={imageSource} />
      <h1>Starbucks</h1>
      <article className='flex flex-col gap-y-4'>
        {starbucks?.items.map(({ name, slug }) => {
          const href = '/restaurants/starbucks/' + slug

          return (
            <Link key={name} href={href}>
              <a>{name}</a>
            </Link>
          )
        })}
      </article>
    </>
  )
}

export default Starbucks
