import type { CartItem } from 'types/cartItem'
import Link from 'next/link'

const Cart = ({
  cart,
  changeItemQuantity,
}: {
  cart: CartItem[]
  changeItemQuantity: (name: string, quantity: number) => void
}) => {
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
      <Link href='/'>
        <a className='button'>x</a>
      </Link>
      <h1>Your cart</h1>
      {cart?.map(({ name, quantity, finalPrice }) => {
        return (
          <section key={name} className='flex justify-between'>
            <select
              onChange={(event) =>
                changeItemQuantity(name, Number(event.target.value))
              }
            >
              <option value='0'>Remove</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
            </select>
            <span>{name}</span>
            <span>${finalPrice}</span>
          </section>
        )
      })}
    </>
  )
}

export default Cart
