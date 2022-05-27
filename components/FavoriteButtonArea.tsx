import { useAuthenticationState } from 'utilities/firebase'
import { useEffect, useState } from 'react'
import axios from 'axios'

const FavoriteButtonArea = ({ restaurantId }: { restaurantId: number }) => {
  const [user, userLoading, userError] = useAuthenticationState()
  const [favorited, setFavorited] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!user) {
      return
    }

    const userId = user.uid
    const getAndSetFavorited = async () => {
      const { data: favorited } = await axios.post('/api/favorited', {
        restaurantId,
        userId,
      })
      setFavorited(favorited)
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
    await axios.post('/api/favorite', { restaurantId, userId })
  }

  const unFavorite = async () => {
    setFavorited(false)
    await axios.put('/api/unfavorite', { restaurantId, userId })
  }

  if (typeof favorited === 'undefined') {
    // If it's undefined, it's still loading
    return null
  } else if (favorited === false) {
    return <button onClick={favorite}>Add to favorites</button>
  } else {
    return <button onClick={unFavorite}>Remove from favorites</button>
  }
}

export default FavoriteButtonArea
