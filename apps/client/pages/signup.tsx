import axios from 'utilities/axios'
import Head from 'components/Head'
import { FormEvent } from 'react'
import { useCheckIfSignedIn } from 'hooks/useCheckIfSignedIn'
import { useRouter } from 'next/router'
import type { AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import EmailInput from 'components/EmailInput'
import PasswordInput from 'components/PasswordInput'
import FormContainer from 'components/FormContainer'

const SignUp = () => {
  useCheckIfSignedIn()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const email = (elements.namedItem('email') as HTMLInputElement).value
      .trim()
      .toLowerCase()
    const password = (elements.namedItem('password') as HTMLInputElement).value

    if (email.toLowerCase().includes('<script>')) {
      toast.error('Email cannot contain "<script>".')
      return
    }
    if (password.toLowerCase().includes('<script>')) {
      toast.error('Password cannot contain "<script>".')
      return
    }

    let signUpPromise: Promise<AxiosResponse<any, any>>
    let sessionId: string
    try {
      signUpPromise = axios.post('/auth/signup', { email, password })

      toast.promise(signUpPromise, {
        loading: 'Signing up',
        success: 'Signed up.',
        error: (error) => {
          const { message } = error.response.data
          return (
            message ||
            "Couldn't sign up. Please make sure your email is correct."
          )
        },
      })

      const { data } = await signUpPromise
      sessionId = data.sessionId
    } catch (error) {
      console.error(error)
      return
    }

    localStorage.setItem('sessionId', sessionId)
    await router.push('/')
    router.reload()
  }

  return (
    <>
      <Head title='Sign up' />
      <FormContainer>
        <h1>Sign up</h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-y-4 items-center'
        >
          <EmailInput />
          <PasswordInput />
          <button type='submit'>Sign up</button>
        </form>
      </FormContainer>
    </>
  )
}

export default SignUp