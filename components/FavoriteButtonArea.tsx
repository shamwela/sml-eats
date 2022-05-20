import { useEffect, useState } from 'react'
import { useAuthenticationState } from 'utilities/firebase'
import Spinner from './Spinner'

const FavoriteButtonArea = ({ restaurantId }: { restaurantId: number }) => {
  const [user] = useAuthenticationState()
  const [favorited, setFavorited] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!user) {
      return
    }

    const getData = async () => {
      const favoritedResponse = await fetch('/api/favorited', {
        body: JSON.stringify({ restaurantId, userId: user.uid }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { favorited } = await favoritedResponse.json()
      

      setFavorited(favorited)
    }
    getData()
  }, [restaurantId, user])
  if (!user) {
    return null
  }
  const userId = user.uid

  const addToFavorites = async () => {
    // This might lead to bugs
    // Fix later
    setFavorited(true)
    await fetch('/api/favorite', {
      body: JSON.stringify({
        restaurantId,
        userId,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const unFavorite = async () => {
    setFavorited(false)
    await fetch('/api/favorite', {
      body: JSON.stringify({
        restaurantId,
        userId,
      }),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  if (typeof favorited === 'undefined') {
    // This is loading state
    return null
  } else if (favorited === false) {
    return <button onClick={addToFavorites}>Add to favorites</button>
  } else {
    return <button onClick={unFavorite}>Remove from favorites</button>
  }
}

export default FavoriteButtonArea
