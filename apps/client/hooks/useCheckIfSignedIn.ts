import { useIsEnglish } from './useIsEnglish'
import { useSignedIn } from './useSignedIn'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

// This is kind of the opposite of useProtectedRoute
export const useCheckIfSignedIn = () => {
  const { signedIn, loading } = useSignedIn()
  const router = useRouter()
  const isEnglish = useIsEnglish()

  useEffect(() => {
    if (loading) return
    if (signedIn) {
      const errorMessage = isEnglish
        ? 'You have already signed in.'
        : 'အကောင့်ဝင်ပြီးသားပါ'
      toast.error(errorMessage)
      router.push('/')
    }
  }, [signedIn, router, loading, isEnglish])
}
