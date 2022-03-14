import Head from 'components/Head'
import React, { useEffect, useState } from 'react'
import { auth, signInWithGoogle } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

const Login = () => {
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
      <Head title='Login' />

      <button onClick={signInWithGoogle}>Login with Google</button>
    </>
  )
}

export default Login
