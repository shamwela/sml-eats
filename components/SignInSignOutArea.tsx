import { useAuthenticationState } from 'utilities/firebase'
import { signIn, signOut } from 'utilities/firebase'

const SignInSignOutArea = () => {
  const [user, loading, error] = useAuthenticationState()

  if (loading) {
    return null
  }
  if (error) {
    alert(error.message)
  }
  if (!user) {
    return <button onClick={signIn}>Continue with Google</button>
  } else {
    return <button onClick={signOut}>Sign out</button>
  }
}

export default SignInSignOutArea
