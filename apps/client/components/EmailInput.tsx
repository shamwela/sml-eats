import { useIsEnglish } from 'hooks/useIsEnglish'

const EmailInput = () => {
  const isEnglish = useIsEnglish()
  const text = isEnglish ? 'Email' : 'အီးမေးလ်'

  return (
    <input
      placeholder={text}
      aria-label={text}
      type='email'
      name='email'
      id='email'
      autoComplete='off'
      autoCorrect='off'
      spellCheck='false'
      autoCapitalize='off'
      required
      aria-required='true'
      minLength={3}
      maxLength={254}
      data-cy='email'
    />
  )
}

export default EmailInput
