const EmailInput = () => (
  <input
    placeholder='Email'
    aria-label='Email'
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

export default EmailInput
