import { toast } from 'react-hot-toast'
import type { NextRouter } from 'next/router'
import axios from './axios'

export const signOut = async (emptyCart: () => void, router: NextRouter) => {
  const signOutPromise = axios.delete('/signout')
  toast.promise(signOutPromise, {
    loading: 'Signing out',
    success: 'Signed out.',
    error: (error) => {
      console.error(error)
      const { message } = error.response.data
      return message || "Couldn't sign out. Please try again."
    },
  })
  try {
    await signOutPromise
  } catch (error) {
    // No need to handle the error again here
    // If there's an error, don't do the following things
    return
  }
  emptyCart()
  localStorage.removeItem('sessionId')
  sessionStorage.removeItem('sessionId')
  await router.push('/')
  router.reload()
}
