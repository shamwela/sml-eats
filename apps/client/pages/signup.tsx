import axios from 'utilities/axios'
import Head from 'components/Head'
import { FormEvent } from 'react'
import { useCheckIfSignedIn } from 'hooks/useCheckIfSignedIn'
import { useRouter } from 'next/router'
import { type AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import EmailInput from 'components/EmailInput'
import PasswordInput from 'components/PasswordInput'
import FormContainer from 'components/FormContainer'

const SignUp = () => {
  useCheckIfSignedIn()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    type Input = {
      value: string
    }
    type Inputs = {
      name: Input
      email: Input
      password: Input
    }
    const target = event.target as typeof event.target & Inputs
    const name = target.name.value.trim()
    const email = target.email.value.trim().toLowerCase()
    console.log(email);
    
    const password = target.password.value

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
