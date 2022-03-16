import { auth, signOut } from 'utilities/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import ButtonLink from './ButtonLink'

const SignInSignOutArea = () => {
  const [user, loading, error] = useAuthState(auth)

  if (loading || error) return null

  if (user) {
    return <button onClick={signOut}>Sign out</button>
  } else {
    return <ButtonLink href='/signin'>Sign in</ButtonLink>
  }
}

export default SignInSignOutArea
