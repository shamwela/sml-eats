import type { CartItem } from 'types/cartItem'
import { ChangeEvent } from 'react'
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

  const handleQuantityChange = (
    name: string,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const quantity = Number(event.target.value)
    changeItemQuantity(name, quantity)
  }

  const zeroToHundred = Array.from(Array(100).keys())

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
              value={quantity}
              onChange={(event) => handleQuantityChange(name, event)}
            >
              {zeroToHundred.map((value) => (
                <option value={value} key={value}>
                  {value === 0 ? 'Remove' : value}
                </option>
              ))}
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
