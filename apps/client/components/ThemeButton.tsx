import { useTheme } from 'next-themes'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return <button onClick={toggleTheme}>Toggle theme</button>
}

export default ThemeButton
