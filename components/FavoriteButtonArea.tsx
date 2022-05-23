import { useAuthenticationState } from 'utilities/firebase'
import { useEffect, useState } from 'react'

const FavoriteButtonArea = ({ restaurantId }: { restaurantId: number }) => {
  const [user, userLoading, userError] = useAuthenticationState()
  const [favorited, setFavorited] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!user) {
      return
    }

    const getAndSetFavorited = async () => {
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
    // If it's undefined, it's still loading
    return null
  } else if (favorited === false) {
    return <button onClick={favorite}>Add to favorites</button>
  } else {
    return <button onClick={unFavorite}>Remove from favorites</button>
  }
}

export default FavoriteButtonArea
