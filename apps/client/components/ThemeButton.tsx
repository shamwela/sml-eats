import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const { locale } = useRouter()
  const isEnglish = locale === 'en'
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <button onClick={toggleTheme}>
      {isEnglish ? 'Toggle theme' : 'အရောင်ပြောင်းမယ်'}
    </button>
  )
}

export default ThemeButton
