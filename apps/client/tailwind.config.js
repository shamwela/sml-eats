const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-elevation': '#f1f5f9',
        'dark-elevation': '#1e293b',
        accent: '#2563eb',
      },
      borderRadius: {
        custom: '0.5rem',
      },
      fontFamily: {
        logo: ['Bebas Neue', ...fontFamily.sans],
        sans: ['Inter', ...fontFamily.sans],
      },
    },
  },
}
