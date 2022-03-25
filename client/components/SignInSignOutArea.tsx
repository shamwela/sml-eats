import { auth, signOut } from 'utilities/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'

const SignInSignOutArea = () => {
  const [user, loading, error] = useAuthState(auth)

  if (loading || error) return null

  if (user) {
    return <button onClick={signOut}>Sign out</button>
  } else {
    return (
      <Link href='/signin'>
        <a className='button'>Sign in</a>
      </Link>
    )
  }
}

export default SignInSignOutArea
