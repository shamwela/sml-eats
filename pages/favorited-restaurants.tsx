import Head from 'components/Head'
import { useEffect } from 'react'
import type { Restaurant } from '@prisma/client'
import RestaurantImageGroup from 'components/RestaurantImageGroup'
import Link from 'next/link'
import ItemContainer from 'components/ItemContainer'
import Spinner from 'components/Spinner'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import { useUser } from 'hooks/useUser'

const FavoritedRestaurants = () => {
  const { user, userLoading, userError } = useUser()
  const fetcher = async (url: string) => {
    if (!user) {
      return null
    }
    const userId = user.uid
    try {
      const { data: favoritedRestaurants } = await axios.post(url, { userId })
      return favoritedRestaurants as Restaurant[]
    } catch (error) {
      alert(
        "Couldn't fetch the favorited restaurants. Please refresh this page or come back later."
      )
      console.error(error)
    }
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
