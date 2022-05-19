import Head from 'components/Head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthenticationState } from 'utilities/firebase'
import type { Restaurant } from '@prisma/client'
import RestaurantImageGroup from 'components/RestaurantImageGroup'
import Link from 'next/link'
import ItemContainer from 'components/ItemContainer'

const FavoritedRestaurants = () => {
  const [user, loading, error] = useAuthenticationState()
  const [favoritedRestaurants, setFavoritedRestaurants] = useState<
    Restaurant[]
  >([])
  const router = useRouter()

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/')
  //   }
  // }, [user, router])

  if (error) {
    alert(error.message)
  }

  useEffect(() => {
    if (!user) {
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
  }, [user])

  return (
    <>
      <Head title='Favorited restaurants' />
      {favoritedRestaurants.length === 0 ? (
        <>
          <h1>No favorites saved.</h1>
          <Link href='/'>
            <a>Find some favorites</a>
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
