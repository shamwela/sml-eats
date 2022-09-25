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
import { checkXSS } from 'utilities/checkXSS'

const SignUp = () => {
  useCheckIfSignedIn()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const name = (elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (elements.namedItem('email') as HTMLInputElement).value
      .trim()
      .toLowerCase()
    const password = (elements.namedItem('password') as HTMLInputElement).value

    if (checkXSS([name, email, password])) {
      return
    }

    let signUpPromise: Promise<AxiosResponse<any, any>>
    let sessionId: string
    try {
      signUpPromise = axios.post('/auth/signup', { name, email, password })

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
          <input
            placeholder='Name'
            aria-label='Name'
            type='text'
            name='name'
            id='name'
            autoComplete='off'
            autoCorrect='off'
            spellCheck='false'
            autoCapitalize='off'
            required
            aria-required='true'
            // These lengths should be the same as the API
            minLength={3}
            maxLength={100}
          />
          <EmailInput />
          <PasswordInput />
          <button type='submit'>Sign up</button>
        </form>
      </FormContainer>
    </>
  )
}

export default SignUp
