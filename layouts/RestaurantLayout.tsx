import Head from 'components/Head'
import Image from 'next/image'
import ItemContainer from 'ui/ItemContainer'
import Link from 'next/link'
import type { Restaurant } from 'types/restaurant'

type RestaurantLayoutProps = {
  restaurant: Restaurant
}

const RestaurantLayout = ({ restaurant }: RestaurantLayoutProps) => {
  const { name: restaurantName, items } = restaurant

  return (
    <>
      <Head title={restaurantName} />
      <h1>{restaurantName}</h1>
      <ItemContainer>
        {items.map(({ name, path, imageSource }) => {
          return (
            <Link key={path} href={path}>
              <a>
                <Image alt={name} src={imageSource} placeholder='blur' />
                <span>{name}</span>
              </a>
            </Link>
          )
        })}
      </ItemContainer>
    </>
  )
}

export default RestaurantLayout
