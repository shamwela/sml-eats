import Head from 'components/Head'
import { type FormEvent } from 'react'
import axios from 'utilities/axios'
import { useCheckIfSignedIn } from 'hooks/useCheckIfSignedIn'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import EmailInput from 'components/EmailInput'
import PasswordInput from 'components/PasswordInput'
import FormContainer from 'components/FormContainer'
import { useIsEnglish } from 'hooks/useIsEnglish'

const SignIn = () => {
  useCheckIfSignedIn()
  const router = useRouter()
  const isEnglish = useIsEnglish()
  const title = isEnglish ? 'Sign in' : 'အကောင့်ဝင်မယ်'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    type Inputs = {
      email: { value: string }
      password: { value: string }
      remember: { checked: boolean }
    }
    const target = event.target as typeof event.target & Inputs
    const email = target.email.value.trim().toLowerCase()
    const password = target.password.value
    const remember = target.remember.checked

    let sessionId: string
    try {
      const signInPromise = axios.post('/auth/signin', { email, password })

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
      <Head title={title} />
      <FormContainer>
        <h1>{title}</h1>
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
            <label htmlFor='remember'>
              {isEnglish ? 'Remember me' : 'စကားဝှက်ကိုမှတ်ထားပါ'}
            </label>
          </div>

          <button type='submit' data-cy='sign-in-button'>
            {title}
          </button>
        </form>
      </FormContainer>
    </>
  )
}

export default SignIn
