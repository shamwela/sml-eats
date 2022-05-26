import { useAuthenticationState } from 'utilities/firebase'
import { signIn, signOut } from 'utilities/firebase'
import { useState, useEffect } from 'react'

const SignInSignOutArea = ({ emptyCart }: { emptyCart: () => void }) => {
  const [user, loading, error] = useAuthenticationState()
  const [isSSR, setIsSSR] = useState(true)
  useEffect(() => setIsSSR(false), [])

  const handleSignOut = () => {
    emptyCart()
    signOut()
  }

  if (isSSR) {
    return null
  }
  if (loading) {
    return null
  }
  if (error) {
    alert(error.message)
  }
  if (!user) {
    return <button onClick={signIn}>Continue with Google</button>
  }
  return <button onClick={handleSignOut}>Sign out</button>
}

export default SignInSignOutArea
