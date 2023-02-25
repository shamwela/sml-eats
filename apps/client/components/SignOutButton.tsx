import { useRouter } from 'next/router'
import { signOut } from 'utilities/signOut'

const SignOutButton = () => {
  const router = useRouter()
  const { locale } = router
  const isEnglish = locale === 'en'

  const handleClick = async () => {
    await signOut(router)
  }

  return (
    <button onClick={handleClick}>
      {isEnglish ? 'Sign out' : 'အကောင့်ထွက်မယ်'}
    </button>
  )
}

export default SignOutButton
