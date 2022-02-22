import type { CartItem } from 'types/cartItem'
import type { Item } from 'types/item'
import { useState } from 'react'
import { SelectedOption } from 'types/selectedOptions'

type OrderProps = {
  item: Item
  oneItemPrice: number
  addItem: (item: CartItem) => void
  selectedOptions: SelectedOption[]
}

const Order = ({
  item,
  oneItemPrice,
  addItem,
  selectedOptions,
}: OrderProps) => {
  const [quantity, setQuantity] = useState(1)
  const finalPrice = oneItemPrice * quantity

  const decreaseQuantity = () => {
    setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addToOrder = () => {
    const cartItem: CartItem = {
      ...item,
      quantity,
      oneItemPrice,
      finalPrice,
      selectedOptions,
    }
    addItem(cartItem)
  }

  return (
    <div className='flex items-center gap-x-4'>
      <button
        disabled={quantity === 1 && true}
        onClick={decreaseQuantity}
        className='bg-light-primary rounded-full p-2'
      >
        <svg
          aria-hidden='true'
          focusable='false'
          viewBox='0 0 24 24'
          className='h-6'
        >
          <path d='M19.333 11H4.667v2h14.666z'></path>
        </svg>
      </button>
      <div>{quantity}</div>
      <button
        onClick={increaseQuantity}
        className='bg-light-primary rounded-full p-2'
      >
        <svg
          aria-hidden='true'
          focusable='false'
          viewBox='0 0 24 24'
          className='h-6'
        >
          <path d='M19.333 11H13V4.665h-2v6.333H4.667v2H11v6.334h2v-6.334h6.333z'></path>
        </svg>
      </button>
      <button onClick={addToOrder} className='w-full'>
        Add {quantity} to order (${finalPrice})
      </button>
    </div>
  )
}

export default Order
