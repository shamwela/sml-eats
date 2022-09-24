import { useSignedIn } from './useSignedIn'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const useProtectedRoute = () => {
  const { signedIn, loading } = useSignedIn()
  const router = useRouter()

  useEffect(() => {
    if (loading) {
      return
    }
    if (!signedIn) {
      toast.error('Please sign in first.')
      router.push('/signin')
    }
  }, [signedIn, router, loading])
}
