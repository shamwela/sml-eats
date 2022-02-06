import type { CartItem } from 'types/cartItem'
import Link from 'next/link'

const Cart = ({ cart }: { cart: CartItem[] }) => {
  const isCartEmpty = cart.length === 0

  if (isCartEmpty) {
    return (
      <section className='flex flex-col gap-y-5'>
        <h1>Your cart is empty.</h1>
        <Link href='/'>
          <a className='button'>Find food</a>
        </Link>
      </section>
    )
  }

  return (
    <>
      <button>x</button>
      <h1>Cart</h1>
      {cart?.map(({ name, quantity, finalPrice }) => {
        return (
          <div key={name}>
            <p>
              {quantity} x {name} = ${finalPrice}
            </p>
          </div>
        )
      })}
    </>
  )
}

export default Cart
