import { signOut, signInWithGoogle } from 'utilities/firebase'
import { useAuthenticationState } from 'utilities/firebase'

const SignInSignOutArea = () => {
  const [user, loading, error] = useAuthenticationState()

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
  if (user) {
    return <button onClick={signOut}>Sign out</button>
  } else {
    return <button onClick={signInWithGoogle}>Continue with Google</button>
  }
}

export default SignInSignOutArea
