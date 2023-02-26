import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const { locale } = useRouter()
  const isEnglish = locale === 'en'
  const lightThemeText = isEnglish
    ? 'Use light theme'
    : 'လင်းတဲ့အရောင်ကိုသုံးမယ်'
  const darkThemeText = isEnglish
    ? 'Use dark theme'
    : 'မှောင်တဲ့အရောင်ကိုသုံးမယ်'
  const finalText = theme === 'light' ? darkThemeText : lightThemeText

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return <button onClick={toggleTheme}>{finalText}</button>
}

export default ThemeButton
