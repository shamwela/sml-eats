import Head from 'components/Head'
import type { FormEvent } from 'react'
import axios from 'utilities/axios'
import Link from 'next/link'
import { useCheckIfSignedIn } from 'hooks/useCheckIfSignedIn'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import type { AxiosResponse } from 'axios'
import EmailInput from 'components/EmailInput'
import PasswordInput from 'components/PasswordInput'
import FormContainer from 'components/FormContainer'
import { checkXSS } from 'utilities/checkXSS'

const SignIn = () => {
  useCheckIfSignedIn()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const email = (elements.namedItem('email') as HTMLInputElement).value
      .trim()
      .toLowerCase()
    const password = (elements.namedItem('password') as HTMLInputElement).value
    const remember = (elements.namedItem('remember') as HTMLInputElement)
      .checked

    if (checkXSS([email, password])) {
      return
    }

    let signInPromise: Promise<AxiosResponse<any, any>>
    let sessionId: string
    try {
      signInPromise = axios.post('/auth/signin', { email, password })

      toast.promise(signInPromise, {
        loading: 'Signing in',
        success: 'Signed in.',
        error: (error) => {
          const { message } = error.response.data
          return (
            message ||
            "Couldn't sign in. Please make sure your email and password are correct."
          )
        },
      })

      const { data } = await signInPromise
      sessionId = data.sessionId
    } catch (error) {
      console.error(error)
      return
    }

    if (remember) {
      localStorage.setItem('sessionId', sessionId)
    } else {
      sessionStorage.setItem('sessionId', sessionId)
    }
    await router.push('/')
    router.reload()
  }

  return (
    <>
      <Head title='Sign in' />
      <FormContainer>
        <h1>Sign in</h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-y-4 items-center'
        >
          <EmailInput />
          <PasswordInput />

          <div className='flex gap-x-2 items-center'>
            <input
              type='checkbox'
              name='remember'
              id='remember'
              defaultChecked
            />
            <label htmlFor='remember'>Remember me</label>
          </div>

          <button type='submit'>Sign in</button>
        </form>
      </FormContainer>
    </>
  )
}

export default SignIn
