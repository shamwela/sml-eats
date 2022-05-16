import Head from 'components/Head'
import { useAuthenticationState } from 'utilities/firebase'
import Spinner from 'components/Spinner'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Profile = () => {
  const [user, loading, error] = useAuthenticationState()
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
          return <Spinner />
        } else if (error) {
          alert(error)
        }
      })()}
    </>
  )
}

export default Profile
