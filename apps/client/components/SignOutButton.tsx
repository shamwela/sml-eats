import { useRouter } from 'next/router'
import { signOut } from 'utilities/signOut'

const SignOutButton = ({ emptyCart }: { emptyCart: () => void }) => {
  const router = useRouter()
  return (
    <button onClick={async () => await signOut(emptyCart, router)}>
      Sign out
    </button>
  )
}

export default SignOutButton
