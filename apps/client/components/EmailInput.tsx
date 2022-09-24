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
    autoFocus
    required
    aria-required='true'
    // These lengths should be the same as the API
    minLength={3}
    maxLength={254}
    // Implement this later
    // aria-invalid='false'
  />
)

export default EmailInput
