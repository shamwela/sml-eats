import Head from 'components/Head'
import Image from 'next/image'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

type RestaurantLayoutProps = {
  restaurant: Restaurant
}

const RestaurantLayout = ({ restaurant }: RestaurantLayoutProps) => {
  const { name, imageSource } = restaurant

  return (
    <>
      <Head title={name} />
      <Image alt={name} src={imageSource} placeholder='blur' />
      <h1>The Pizza Company</h1>
      <article className='flex flex-col gap-y-4'>
        {/* {thePizzaCompany?.items.map(({ name, slug, imageSource }) => {
          const href = '/restaurants/the-pizza-company/' + slug

          return (
            <Link key={name} href={href}>
              <a>
                <Image alt={name} src={imageSource} placeholder='blur' />
                <span>{name}</span>
              </a>
            </Link>
          )
        })} */}
      </article>
    </>
  )
}

export default RestaurantLayout
