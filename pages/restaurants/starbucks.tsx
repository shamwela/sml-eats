import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

const Starbucks = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const starbucks = restaurants.find(
    (restaurant) => restaurant.slug === 'starbucks'
  )

  return (
    <>
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
