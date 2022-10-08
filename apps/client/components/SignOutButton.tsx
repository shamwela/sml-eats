import { useRouter } from 'next/router'
import { signOut } from 'utilities/signOut'

const SignOutButton = () => {
  const router = useRouter()

  const handleClick = async () => {
    await signOut(router)
  }

  return <button onClick={handleClick}>Sign out</button>
}

export default SignOutButton
