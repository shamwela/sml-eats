import 'styles/globals.css'
import type { AppProps } from 'next/app'
import type { CartItem } from 'types/cartItem'
import Navigation from 'components/Navigation'
import { ThemeProvider } from 'next-themes'
import { useLocalStorage } from 'usehooks-ts'
import { UserContext } from 'contexts/user'
import { UserLoadingContext } from 'contexts/userLoading'
import { UserErrorContext } from 'contexts/userError'
import { useAuthenticationState } from 'utilities/firebase'
import GoogleAnalyticsScripts from 'components/GoogleAnalyticsScripts'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, userLoading, userError] = useAuthenticationState()
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
    // Because this function is mixing 2 concerns, improve this later
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

  const emptyCart = () => setCart([])

  return (
    <>
      <GoogleAnalyticsScripts />
      <ThemeProvider attribute='class' defaultTheme='system'>
        <UserContext.Provider value={user}>
          <UserLoadingContext.Provider value={userLoading}>
            <UserErrorContext.Provider value={userError}>
              <Navigation cart={cart} emptyCart={emptyCart} />
              <main className='mx-auto mb-24 flex max-w-4xl flex-col gap-y-4'>
                <Component
                  {...pageProps}
                  cart={cart}
                  addItem={addItem}
                  changeItemQuantity={changeItemQuantity}
                />
              </main>
            </UserErrorContext.Provider>
          </UserLoadingContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
