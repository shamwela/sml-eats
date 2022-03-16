import Head from 'components/Head'
import { auth } from 'utilities/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoadingPlaceholder from 'components/LoadingPlaceholder'

const Profile = () => {
  const [user, loading, error] = useAuthState(auth)

  return (
    <>
      <Head title='Profile' />

      {loading && <LoadingPlaceholder />}
      {error && <p>There was an error. Please try again.</p>}
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
