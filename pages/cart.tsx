import type { CartItem } from 'types/cartItem'
import type { ChangeEvent } from 'react'
import { useState, useEffect } from 'react'
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
  // This is the code to fix this issue (https://github.com/vercel/next.js/discussions/35773).
  const [isSSR, setIsSSR] = useState(true)
  useEffect(() => setIsSSR(false), [])

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

      {!isSSR ? (
        <div className='mx-auto flex flex-col gap-y-[inherit] w-full max-w-md'>
          {cart.length === 0 ? (
            <>
              <h1>Your cart is empty.</h1>
              <Link href='/'>
                <a className='button'>Find food</a>
              </Link>
            </>
          ) : (
            <>
              <h1>Your cart</h1>
              {cart.map(
                ({ id, name, quantity, finalPrice, path, selectedOptions }) => (
                  <div key={id} className='flex items-start gap-x-4'>
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
                        {selectedOptions.map(({ id, name, inputs }) => {
                          const optionName = name
                          // Since there will be only 1 input
                          const inputName = inputs[0].name
                          return (
                            <div key={id}>
                              {/* For example, Size: Large */}
                              {optionName}: {inputName}
                            </div>
                          )
                        })}
                      </a>
                    </Link>
                    <span className='ml-auto'>${finalPrice}</span>
                  </div>
                )
              )}
              <Link href='/checkout'>
                <a className='button'>Go to checkout (${checkoutPrice})</a>
              </Link>
            </>
          )}
        </div>
      ) : null}
    </>
  )
}

export default Cart
