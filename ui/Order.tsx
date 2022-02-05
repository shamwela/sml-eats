import type { CartItem } from 'types/cartItem'
import type { Item } from 'types/item'
import { useState } from 'react'

const Order = ({
  item,
  oneItemPrice,
  updateCart,
}: {
  item: Item
  oneItemPrice: number
  updateCart: (item: CartItem) => void
}) => {
  const [quantity, setQuantity] = useState(1)
  const finalPrice = oneItemPrice * quantity

  const decreaseQuantity = () => {
    setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addToOrder = () => {
    const cartItem: CartItem = { ...item, quantity, finalPrice }
    updateCart(cartItem)
  }

  return (
    <div className='flex items-center gap-x-4'>
      <button disabled={quantity === 1 && true} onClick={decreaseQuantity}>
        -
      </button>
      <div>{quantity}</div>
      <button onClick={increaseQuantity}>+</button>
      <button onClick={addToOrder}>
        Add {quantity} to order (${finalPrice})
      </button>
    </div>
  )
}

export default Order
