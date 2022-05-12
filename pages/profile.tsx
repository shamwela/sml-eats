import Head from 'components/Head'
import { auth } from 'utilities/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoadingPlaceholder from 'components/LoadingPlaceholder'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Profile = () => {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <>
      <Head title='Profile' />

      {(() => {
        if (user) {
          return (
            <>
              <span>Name: {user.displayName}</span>
              <span>Email: {user.email}</span>
            </>
          )
        } else if (loading) {
          return <LoadingPlaceholder />
        } else if (error) {
          alert(error)
        }
      })()}
    </>
  )
}

export default Profile
