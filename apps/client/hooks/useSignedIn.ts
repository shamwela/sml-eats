import { sessionId } from 'utilities/sessionId'
import { useEffect, useState } from 'react'

export const useSignedIn = () => {
  const [signedIn, setSignedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      setSignedIn(true)
    }

    // When this useEffect runs, it's no longer server-side rendering
    // It becomes client-side rendering
    // sessionId is now loaded
    setLoading(false)
  }, [])

  return { signedIn, loading }
}
