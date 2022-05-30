import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from 'hooks/useUser'

const FavoriteButtonArea = ({ restaurantId }: { restaurantId: number }) => {
  const { user, userLoading, userError } = useUser()
  const [favorited, setFavorited] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!user) {
      return
    }

    const userId = user.uid
    const getAndSetFavorited = async () => {
      try {
        const { data: favorited } = await axios.post('/api/favorited', {
          restaurantId,
          userId,
        })
        setFavorited(favorited)
      } catch (error) {
        setFavorited(undefined)
        // Setting it as undefined will remove the "favorite" feature completely
        console.error(error)
      }
    }
    getAndSetFavorited()
  }, [restaurantId, user])

  if (userError) {
    alert(userError.message)
  }
  if (userLoading || !user) {
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
      alert("Couldn't add to favorites. Please try again.")
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
      alert("Couldn't remove from favorites. Please try again.")
      console.error(error)
    }
  }

  if (typeof favorited === 'undefined') {
    // If it's undefined, it's still loading
    return null
  } else if (!favorited) {
    return <button onClick={favorite}>Add to favorites</button>
  } else {
    return <button onClick={unFavorite}>Remove from favorites</button>
  }
}

export default FavoriteButtonArea
