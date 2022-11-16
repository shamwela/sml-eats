const PasswordInput = () => (
  <input
    placeholder='Password'
    aria-label='Password'
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

export default PasswordInput
