import type { CartItem } from 'types/cartItem'
import { useState, useEffect, useMemo } from 'react'
import Head from 'components/Head'
import Link from 'next/link'
import type { ChangeEvent } from 'react'
import { useProtectedRoute } from 'hooks/useProtectedRoute'

const zeroToHundred = Array.from(Array(101).keys())

const Cart = ({
  cart,
  changeItemQuantity,
}: {
  cart: CartItem[]
  // eslint-disable-next-line no-unused-vars
  changeItemQuantity: (id: number, quantity: number) => void
}) => {
  useProtectedRoute()
  
  // This is the code to fix this issue (https://github.com/vercel/next.js/discussions/35773).
  const [isSSR, setIsSSR] = useState(true)
  useEffect(() => setIsSSR(false), [])

  const checkoutPrice = useMemo(
    () => cart.reduce((total, item) => total + item.finalPrice, 0),
    [cart]
  )

  const handleQuantityChange = (
    id: number,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const quantity = Number(event.target.value)
    changeItemQuantity(id, quantity)
  }

  return (
    <>
      <Head title='Your cart' />
      {!isSSR && (
        <div className='mx-auto flex flex-col gap-y-[inherit] w-full max-w-md'>
          {cart.length === 0 ? (
            <>
              <h1 className='self-center'>Your cart is empty.</h1>
              <Link href='/'>
                <a className='button self-center'>Find food</a>
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
                      onChange={(event) => handleQuantityChange(id, event)}
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
                <a className='button max-w-full w-full'>
                  Go to checkout (${checkoutPrice})
                </a>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Cart
