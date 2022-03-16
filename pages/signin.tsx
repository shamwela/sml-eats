import Head from 'components/Head'
import { auth, signInWithGoogle } from 'utilities/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import LoadingPlaceholder from 'components/LoadingPlaceholder'

const SignIn = () => {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  if (user) {
    router.push('/')
  }

  return (
    <>
      <Head title='Sign in' />

      {loading && <LoadingPlaceholder />}
      {error && <p>There was an error. Please try again.</p>}
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

export default SignIn
