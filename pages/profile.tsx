import Head from 'components/Head'
import { useAuthenticationState } from 'utilities/firebase'
import Spinner from 'components/Spinner'
import { useRouter } from 'next/router'

const Profile = () => {
  const [user, loading, error] = useAuthenticationState()
  const router = useRouter()
  if (!user) router.push('/')
  if (error) alert(error.message)

  return (
    <>
      <Head title='Profile' />
      {loading && <Spinner />}
      {user && (
        <>
          <span>Name: {user.displayName}</span>
          <span>Email: {user.email}</span>
        </>
      )}
    </>
  )
}

export default Profile
