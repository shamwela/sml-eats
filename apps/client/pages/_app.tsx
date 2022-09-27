import 'styles/globals.css'
import type { AppProps } from 'next/app'
import type { CartItem } from 'types/cartItem'
import Navigation from 'components/Navigation'
import { ThemeProvider } from 'next-themes'
import { useLocalStorage } from 'usehooks-ts'
import GoogleAnalyticsScripts from 'components/GoogleAnalyticsScripts'
import { Toaster } from 'react-hot-toast'
import type { EmptyCart } from 'types/EmptyCart'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', [])

  const addItem = (newCartItem: CartItem) => {
    const newCart = [...cart, newCartItem]
    setCart(newCart)
  }

  const removeItem = (id: number) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== id)
    setCart(newCart)
  }

  const changeItemQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeItem(id)
      return
    } else {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          // Must re-calculate the final price
          const finalPrice = item.oneItemPrice * quantity
          // Also change the quantity
          return { ...item, quantity, finalPrice }
        } else {
          return item
        }
      })
      setCart(newCart)
    }
  }

  const emptyCart: EmptyCart = () => setCart([])

  return (
    <>
      <GoogleAnalyticsScripts />
      <ThemeProvider attribute='class' defaultTheme='system'>
        <Toaster />
        <Navigation cart={cart} emptyCart={emptyCart} />
        <main className='mx-auto mb-24 flex max-w-4xl flex-col gap-y-4'>
          <Component
            {...pageProps}
            cart={cart}
            addItem={addItem}
            changeItemQuantity={changeItemQuantity}
          />
        </main>
      </ThemeProvider>
    </>
  )
}

export default MyApp
