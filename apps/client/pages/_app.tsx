import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from 'components/Navigation'
import { ThemeProvider } from 'next-themes'
import GoogleAnalyticsScripts from 'components/GoogleAnalyticsScripts'
import { Toaster } from 'react-hot-toast'
import { store } from 'store/store'
import { Provider } from 'react-redux'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GoogleAnalyticsScripts />
      <ThemeProvider attribute='class' defaultTheme='system'>
        <Toaster
          toastOptions={{ className: 'dark:bg-dark-elevation dark:text-white' }}
        />
        <Provider store={store}>
          <Navigation />
          <main className='mx-auto mb-24 flex max-w-4xl flex-col gap-y-4'>
            <Component {...pageProps} />
          </main>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
