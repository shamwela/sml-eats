import { useIsEnglish } from 'hooks/useIsEnglish'

const PasswordInput = () => {
  const isEnglish = useIsEnglish()
  const text = isEnglish ? 'Password' : 'စကားဝှက်'

  return (
    <input
      placeholder={text}
      aria-label={text}
      type='password'
      name='password'
      id='password'
      autoComplete='off'
      required
      aria-required='true'
      // These lengths should be the same as the API
      minLength={8}
      maxLength={128}
      data-cy='password'
    />
  )
}

export default PasswordInput
