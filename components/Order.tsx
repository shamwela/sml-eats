import type { AddItem } from 'types/addItem'
import { useState } from 'react'
import type { CartItem } from 'types/cartItem'
import { useRouter } from 'next/router'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import type { Item } from '@prisma/client'
import type { NestedOption } from 'types/nestedOption'

type OrderProps = {
  item: Item
  oneItemPrice: number
  addItem: AddItem
  selectedOptions: NestedOption[]
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

  const router = useRouter()
  const addToOrder = () => {
    const newCartItem: CartItem = {
      ...item,
      quantity,
      oneItemPrice,
      finalPrice,
      selectedOptions,
    }
    addItem(newCartItem)

    router.back()
  }

  return (
    <div className='flex items-center gap-x-4'>
      <button
        aria-label='Decrease quantity'
        disabled={quantity === 1 && true}
        onClick={decreaseQuantity}
        className='bg-light-primary rounded-full p-2'
      >
        <MinusIcon />
      </button>
      <div>{quantity}</div>
      <button
        aria-label='Increase quantity'
        onClick={increaseQuantity}
        className='bg-light-primary rounded-full p-2'
      >
        <PlusIcon />
      </button>
      <button onClick={addToOrder} className='w-full'>
        Add {quantity} to order (${finalPrice})
      </button>
    </div>
  )
}

export default Order
