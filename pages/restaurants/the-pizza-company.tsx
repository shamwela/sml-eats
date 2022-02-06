import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

const ThePizzaCompany = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const thePizzaCompany = restaurants.find(
    (restaurant) => restaurant.slug === 'the-pizza-company'
  )

  return (
    <>
      <h1>The Pizza Company</h1>
      <article className='flex flex-col gap-y-4'>
        {thePizzaCompany?.items.map(({ name, slug }) => {
          const href = '/restaurants/the-pizza-company/' + slug

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

export default ThePizzaCompany
