import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'
import { useRouter } from 'next/router'

const ThePizzaCompany = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const thePizzaCompany = restaurants.find(
    (restaurant) => restaurant.name === 'The Pizza Company'
  )
  const { pathname } = useRouter()

  return (
    <>
      <h1>The Pizza Company</h1>
      <article className='flex flex-col gap-y-4'>
        {thePizzaCompany?.items.map(({ name, slug }) => {
          const href = `${pathname}/${slug}`

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
