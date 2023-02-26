import { useState, useEffect } from 'react'
import Head from 'components/Head'
import Link from 'next/link'
import { type ChangeEvent } from 'react'
import { useProtectedRoute } from 'hooks/useProtectedRoute'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { remove, changeQuantity } from 'store/cartSlice'

const zeroToHundred = Array.from(Array(101).keys())

const Cart = () => {
  useProtectedRoute()

  // This is the code to fix this issue (https://github.com/vercel/next.js/discussions/35773).
  const [isSSR, setIsSSR] = useState(true)
  useEffect(() => setIsSSR(false), [])

  const cart = useAppSelector((store) => store.cart)
  const checkoutPrice = cart.reduce((total, item) => total + item.finalPrice, 0)
  const dispatch = useAppDispatch()

  const handleQuantityChange = (
    id: number,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const quantity = Number(event.target.value)

    if (quantity === 0) {
      dispatch(remove(id))
    } else {
      dispatch(changeQuantity({ id, quantity }))
    }
  }

  return (
    <>
      <Head title='Your cart' />
      {!isSSR && (
        <div className='mx-auto flex flex-col gap-y-[inherit] w-full max-w-md'>
          {cart.length === 0 ? (
            <>
              <h1 className='self-center'>Your cart is empty.</h1>
              <Link href='/' className='button self-center'>
                Find food
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
                      data-cy='quantity-select'
                    >
                      {zeroToHundred.map((value) => (
                        <option value={value} key={value}>
                          {value === 0 ? 'Remove' : value}
                        </option>
                      ))}
                    </select>
                    <Link href={path}>
                        <strong data-cy='item-name'>{name}</strong>
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
                    </Link>
                    <span className='ml-auto'>${finalPrice}</span>
                  </div>
                )
              )}
              <Link href='/checkout' className='button max-w-full w-full'>
                Go to checkout (${checkoutPrice})
              </Link>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Cart
