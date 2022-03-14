import Head from 'components/Head'
import { auth, signInWithGoogle } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

const SignIn = () => {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  if (user) {
    router.push('/')
  }

  // Improve the following logics later
  if (loading) {
    return <p>Loading please wait</p>
  }

  if (error) {
    return <p>There was an error. Please try again.</p>
  }

  return (
    <>
      <Head title='Sign in' />

      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

export default SignIn
