import { useRouter } from 'next/router'

export const useIsEnglish = () => {
  const { locale } = useRouter()
  return locale === 'en'
}
