import Head from 'components/Head'
import { useEffect, useState } from 'react'
import { useAuthenticationState } from 'utilities/firebase'
import type { Restaurant } from '@prisma/client'
import RestaurantImageGroup from 'components/RestaurantImageGroup'
import Link from 'next/link'
import ItemContainer from 'components/ItemContainer'
import Spinner from 'components/Spinner'
import { useRouter } from 'next/router'

const FavoritedRestaurants = () => {
  const [user, loading, error] = useAuthenticationState()
  const [favoritedRestaurants, setFavoritedRestaurants] = useState<
    Restaurant[] | undefined
  >(undefined)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    const getFavoritedRestaurants = async () => {
      const favoritedRestaurantsResponse = await fetch(
        '/api/get-favorited-restaurants',
        {
          method: 'POST',
          body: JSON.stringify({ userId: user.uid }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const favoritedRestaurants = await favoritedRestaurantsResponse.json()
      setFavoritedRestaurants(favoritedRestaurants)
    }
    getFavoritedRestaurants()
  }, [router, user])

  if (loading) {
    return <Spinner />
  }
  if (error) {
    alert(error.message)
  }
  if (!favoritedRestaurants) {
    return null
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
