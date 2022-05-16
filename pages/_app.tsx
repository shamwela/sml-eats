import 'styles/globals.css'
import type { AppProps } from 'next/app'
import type { CartItem } from 'types/cartItem'
import Navigation from 'components/Navigation'
import { ThemeProvider } from 'next-themes'
import { useLocalStorage } from 'usehooks-ts'

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
    }

    const newCart = cart.map((item) => {
      if (item.id === id) {
        const finalPrice = item.oneItemPrice * quantity
        return { ...item, quantity, finalPrice }
      }
      return item
    })
    setCart(newCart)
  }

  return (
    <ThemeProvider attribute='class' defaultTheme='system'>
      <Navigation cart={cart} />
      <main className='mx-auto mb-24 flex max-w-4xl flex-col gap-y-4'>
        <Component
          {...pageProps}
          cart={cart}
          addItem={addItem}
          changeItemQuantity={changeItemQuantity}
        />
      </main>
    </ThemeProvider>
  )
}

export default MyApp
