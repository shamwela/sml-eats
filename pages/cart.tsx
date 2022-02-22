import type { CartItem } from 'types/cartItem'
import { ChangeEvent } from 'react'
import Head from 'components/Head'
import Link from 'next/link'

const zeroToHundred = Array.from(Array(100).keys())

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
      <>
        <Head title='Your cart' description='Your cart' />
        <section className='flex flex-col gap-y-5'>
          <h1>Your cart is empty.</h1>
          <Link href='/'>
            <a className='button'>Find food</a>
          </Link>
        </section>
      </>
    )
  }

  const handleQuantityChange = (
    name: string,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const quantity = Number(event.target.value)
    changeItemQuantity(name, quantity)
  }

  const checkoutPrice = cart.reduce((total, item) => total + item.finalPrice, 0)

  return (
    <>
      <Head title='Your cart' description='Your cart' />

      <h1>Your cart</h1>
      {cart.map(({ name, quantity, finalPrice, path, selectedOptions }) => {
        return (
          <section key={name} className='flex gap-x-4'>
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
            <Link href={path}>
              <a className='flex w-full justify-between'>
                <span>{name}</span>
                {selectedOptions?.map(({ name, value }) => {
                  return (
                    <span key={name}>
                      <strong>{name}</strong>: <span>{value}</span>
                    </span>
                  )
                })}
                <span>${finalPrice}</span>
              </a>
            </Link>
          </section>
        )
      })}

      <Link href='/checkout'>
        <a className='button'>Go to checkout (${checkoutPrice})</a>
      </Link>
    </>
  )
}

export default Cart
