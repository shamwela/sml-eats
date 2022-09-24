import { useSignedIn } from 'hooks/useSignedIn'
import { useRouter } from 'next/router'
import { signOut } from 'utilities/signOut'

const SignOutButton = ({ emptyCart }: { emptyCart: () => void }) => {
  const { signedIn, loading } = useSignedIn()
  const router = useRouter()

  if (!signedIn || loading) {
    return null
  }
  return (
    <button onClick={async () => await signOut(emptyCart, router)}>
      Sign out
    </button>
  )
}

export default SignOutButton
