import { useIsEnglish } from './useIsEnglish'
import { useSignedIn } from './useSignedIn'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const useProtectedRoute = () => {
  const { signedIn, loading } = useSignedIn()
  const router = useRouter()
  const isEnglish = useIsEnglish()

  useEffect(() => {
    if (loading) {
      return
    }
    if (!signedIn) {
      const errorMessage = isEnglish
        ? 'Please sign up first.'
        : 'အကောင့်အရင်ဖွင့်ပေးပါ'
      toast.error(errorMessage)
      router.push('/signup')
    }
  }, [signedIn, router, loading, isEnglish])
}
