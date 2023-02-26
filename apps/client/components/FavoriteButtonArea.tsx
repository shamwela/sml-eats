import { useEffect, useState } from 'react'
import axios from 'utilities/axios'
import { useSignedIn } from 'hooks/useSignedIn'
import toast from 'react-hot-toast'
import { useIsEnglish } from 'hooks/useIsEnglish'

const FavoriteButtonArea = ({ restaurantId }: { restaurantId: number }) => {
  const { signedIn, loading } = useSignedIn()
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    if (!signedIn) {
      return
    }

    const getAndSetFavorited = async () => {
      try {
        const { data: favorited } = await axios.get<boolean>('/favorited', {
          params: {
            restaurantId,
          },
        })
        setFavorited(favorited)
      } catch (error) {
        toast.error('"Favorite" feature is not available at this time.')
        console.error(error)
      }
    }
    getAndSetFavorited()
  }, [restaurantId, signedIn])

  const favorite = async () => {
    // Change the state first to make it look faster
    setFavorited(true)
    try {
      await axios.post('/favorite', { restaurantId })
    } catch (error) {
      // Revert back to the previous state
      setFavorited(false)
      toast.error("Couldn't add to favorites. Please try again now or later.")
      console.error(error)
    }
  }

  // This function is similar to the `favorite` function above
  const unFavorite = async () => {
    setFavorited(false)
    try {
      await axios.delete('/unfavorite', { data: { restaurantId } })
    } catch (error) {
      setFavorited(true)
      toast.error(
        "Couldn't remove from favorites. Please try again now or later."
      )
      console.error(error)
    }
  }

  const isEnglish = useIsEnglish()

  if (loading || !signedIn) {
    return null
  }
  if (favorited) {
    return (
      <button onClick={unFavorite}>
        {isEnglish ? 'Remove from favorites' : 'စိတ်ကြိုက်များမှ ဖယ်ရှားမယ်'}
      </button>
    )
  }
  return (
    <button onClick={favorite}>
      {isEnglish ? 'Add to favorites' : 'စိတ်ကြိုက်များထဲသို့ ထည့်မယ်'}
    </button>
  )
}

export default FavoriteButtonArea
