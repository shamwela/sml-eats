import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from 'hooks/useUser'

const FavoriteButtonArea = ({ restaurantId }: { restaurantId: number }) => {
  const { userError, userLoading, user } = useUser()
  const [favorited, setFavorited] = useState<boolean | null>(null)

  useEffect(() => {
    if (!user) {
      return
    }

    const getAndSetFavorited = async () => {
      try {
        const { data: favorited } = await axios.post('/api/favorited', {
          restaurantId,
          userId: user.uid,
        })
        setFavorited(favorited)
      } catch (error) {
        alert('"Favorite" feature is not available at this time.')
        console.error(error)
      }
    }
    getAndSetFavorited()
  }, [restaurantId, user])

  if (userError) {
    alert('Your account encountered an error. Please try again now or later.')
    console.error(userError)
  }
  if (userLoading || !user) {
    // Show nothing instead of a spinner
    // This causes layout shift but a better way hasn't been found yet
    return null
  }

  const userId = user.uid
  const favorite = async () => {
    // Change the state first to make it look faster
    setFavorited(true)
    try {
      await axios.post('/api/favorite', { restaurantId, userId })
    } catch (error) {
      // Revert back to the previous state
      setFavorited(false)
      alert("Couldn't add to favorites. Please try again now or later.")
      console.error(error)
    }
  }

  // This function is similar to the `favorite` function
  const unFavorite = async () => {
    setFavorited(false)
    try {
      await axios.put('/api/unfavorite', { restaurantId, userId })
    } catch (error) {
      setFavorited(true)
      alert("Couldn't remove from favorites. Please try again now or later.")
      console.error(error)
    }
  }

  if (favorited === null) {
    return null
  } else if (favorited) {
    return <button onClick={unFavorite}>Remove from favorites</button>
  } else {
    return <button onClick={favorite}>Add to favorites</button>
  }
}

export default FavoriteButtonArea
