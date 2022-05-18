import { useEffect, useState } from 'react'
import { useAuthenticationState } from 'utilities/firebase'

const FavoriteButtonArea = ({ restaurantId }: { restaurantId: number }) => {
  const [user] = useAuthenticationState()
  const [favorited, setFavorited] = useState(false)

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

  if (!favorited) {
    return <button onClick={addToFavorites}>Add to favorites</button>
  } else {
    return <button onClick={unFavorite}>Remove from favorites</button>
  }
}

export default FavoriteButtonArea
