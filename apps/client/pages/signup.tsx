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
import { useIsEnglish } from 'hooks/useIsEnglish'

const SignUpPage = () => {
  useCheckIfSignedIn()
  const router = useRouter()
  const isEnglish = useIsEnglish()
  const title = isEnglish ? 'Sign up' : 'အကောင့်ဖွင့်မယ်'
  const nameText = isEnglish ? 'Name' : 'နာမည်'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    type Inputs = {
      name: { value: string }
      email: { value: string }
      password: { value: string }
    }
    const target = event.target as typeof event.target & Inputs
    const name = target.name.value.trim()
    const email = target.email.value.trim().toLowerCase()
    const password = target.password.value

    let signUpPromise: Promise<AxiosResponse<any, any>>
    let sessionId: string
    try {
      signUpPromise = axios.post('/auth/signup', { name, email, password })

      toast.promise(signUpPromise, {
        loading: 'Signing up',
        success: 'Signed up.',
        error: (error) => {
          const errorMessage =
            error?.response?.data?.message || "Couldn't sign up."
          return errorMessage
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
      <Head title={title} />
      <FormContainer>
        <h1>{title}</h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-y-4 items-center'
        >
          <input
            placeholder={nameText}
            aria-label={nameText}
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
          <button type='submit'>{title}</button>
        </form>
      </FormContainer>
    </>
  )
}

export default SignUpPage
