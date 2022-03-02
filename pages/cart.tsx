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
  // eslint-disable-next-line no-unused-vars
  changeItemQuantity: (name: string, quantity: number) => void
}) => {
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
      <Head title='Your cart' />

      {cart.length === 0 ? (
        <div className='flex flex-col gap-y-4'>
          <h1>Your cart is empty.</h1>
          <Link href='/'>
            <a>Find food</a>
          </Link>
        </div>
      ) : (
        <div className='mx-auto flex max-w-sm flex-col gap-4'>
          <h1>Your cart</h1>
          {cart.map(({ name, quantity, finalPrice, path, selectedOptions }) => {
            return (
              <section key={name} className='flex justify-between'>
                <div className='flex items-start gap-x-4'>
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
                    <a>
                      <strong>{name}</strong>
                      {selectedOptions.map(({ name, inputs }) => {
                        const optionName = name
                        // Since there will be only 1 input
                        const inputName = inputs[0].name
                        return (
                          <div key={optionName}>
                            {/* For example, Size: Large */}
                            {optionName}: {inputName}
                          </div>
                        )
                      })}
                    </a>
                  </Link>
                </div>

                <span>${finalPrice}</span>
              </section>
            )
          })}
          <Link href='/checkout'>
            <a>
              <button className='w-full'>
                Go to checkout (${checkoutPrice})
              </button>
            </a>
          </Link>
        </div>
      )}
    </>
  )
}

export default Cart
