import Head from 'components/Head'
import RestaurantImageGroup from 'components/RestaurantImageGroup'
import Link from 'next/link'
import ItemContainer from 'components/ItemContainer'
import Spinner from 'components/Spinner'
import useSWR from 'swr'
import axios from 'utilities/axios'
import toast from 'react-hot-toast'
import { useProtectedRoute } from 'hooks/useProtectedRoute'
import { type Restaurant } from 'types/restaurant'
import { useIsEnglish } from 'hooks/useIsEnglish'

const FavoritedRestaurants = () => {
  useProtectedRoute()
  const { data: favoritedRestaurants, error } = useSWR(
    '/user/favorited-restaurants',
    async (url: string) => {
      try {
        const { data: favoritedRestaurants } = await axios.get(url)
        return favoritedRestaurants as Restaurant[]
      } catch (error) {
        toast.error(
          "Couldn't fetch your favorited restaurants. Please refresh this page or come back later."
        )
        if (error instanceof Error) {
          throw new Error(error.message)
        } else {
          throw new Error('An unknown error occurred.')
        }
      }
    }
  )
  const isEnglish = useIsEnglish()
  const title = isEnglish ? 'Favorited restaurants' : 'အကြိုက်ဆုံးဆိုင်များ'

  if (error instanceof Error) {
    return <p className='text-red-500'>{error.message}</p>
  }
  if (!favoritedRestaurants) {
    return <Spinner />
  }
  return (
    <>
      <Head title={title} />
      <h1>{title}</h1>
      {favoritedRestaurants.length === 0 ? (
        <>
          <h1>No favorites saved.</h1>
          <Link href='/' className='button'>
            Find some favorites
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
