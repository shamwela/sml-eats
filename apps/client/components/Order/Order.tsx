import type { AddItem } from 'types/addItem'
import { useState } from 'react'
import type { CartItem } from 'types/cartItem'
import { useRouter } from 'next/router'
import type { Item } from 'types/item'
import type { NestedOption } from 'types/nestedOption'
import QuantityChanger from 'components/QuantityChanger/QuantityChanger'

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
      <QuantityChanger quantity={quantity} setQuantity={setQuantity} />
      <button onClick={addToOrder} className='max-w-full w-full'>
        Add {quantity} to order (${finalPrice})
      </button>
    </div>
  )
}

export default Order
