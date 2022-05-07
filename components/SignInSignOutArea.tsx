import { auth, signOut, signInWithGoogle } from 'utilities/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const SignInSignOutArea = () => {
  const [user, loading, error] = useAuthState(auth)

  if (user) {
    return <button onClick={signOut}>Sign out</button>
  }
  if (loading) {
    return null
  }
  if (error) {
    return (
      <p className='text-red-500'>
        Sorry, something went wrong with our servers. Please try again later.
      </p>
    )
  }
  return <button onClick={signInWithGoogle}>Continue with Google</button>
}

export default SignInSignOutArea
