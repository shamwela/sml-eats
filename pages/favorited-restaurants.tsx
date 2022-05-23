import Head from 'components/Head'
import { useEffect } from 'react'
import { useAuthenticationState } from 'utilities/firebase'
import type { Restaurant } from '@prisma/client'
import RestaurantImageGroup from 'components/RestaurantImageGroup'
import Link from 'next/link'
import ItemContainer from 'components/ItemContainer'
import Spinner from 'components/Spinner'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const FavoritedRestaurants = () => {
  const [user, userLoading, userError] = useAuthenticationState()
  const fetcher = async (url: string) => {
    if (!user) {
      return null
    }
    const favoritedRestaurantsResponse = await fetch(url, {
      body: JSON.stringify({ userId: user.uid }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const favoritedRestaurants: Restaurant[] =
      await favoritedRestaurantsResponse.json()
    return favoritedRestaurants
  }
  const { data: favoritedRestaurants, error: favoritedRestaurantsError } =
    useSWR('/api/get-favorited-restaurants', fetcher)
  const router = useRouter()

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/')
      return
    }
  }, [userLoading, user, router])

  if (userLoading || !favoritedRestaurants) {
    return <Spinner />
  }
  if (userError) {
    alert(userError.message)
  }
  if (favoritedRestaurantsError) {
    alert(favoritedRestaurantsError.message)
  }

  return (
    <>
      <Head title='Favorited restaurants' />
      {favoritedRestaurants.length === 0 ? (
        <>
          <h1>No favorites saved.</h1>
          <Link href='/'>
            <a className='button'>Find some favorites</a>
          </Link>
        </>
      ) : (
        <ItemContainer>
          {favoritedRestaurants.map((restaurant) => (
            <RestaurantImageGroup {...restaurant} key={restaurant.id} />
          ))}
        </ItemContainer>
      )}
    </>
  )
}

export default FavoritedRestaurants
