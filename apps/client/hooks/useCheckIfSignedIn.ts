import { useSignedIn } from './useSignedIn'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

// This is kind of the opposite of useProtectedRoute
export const useCheckIfSignedIn = () => {
  const { signedIn, loading } = useSignedIn()
  const router = useRouter()

  useEffect(() => {
    if (loading) {
      return
    }
    if (signedIn) {
      toast.error("You've already signed in.")
      router.push('/')
    }
  }, [signedIn, router, loading])
}
