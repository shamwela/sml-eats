import type { Item } from 'types/item'
import { useState } from 'react'

const Order = ({
  oneItemPrice,
  updateCart,
}: {
  oneItemPrice: number
  updateCart: (item: Item) => void
}) => {
  const [quantity, setQuantity] = useState(1)
  const finalPrice = oneItemPrice * quantity

  const decreaseQuantity = () => {
    setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className='flex items-center gap-x-4'>
      <button disabled={quantity === 1 && true} onClick={decreaseQuantity}>
        -
      </button>
      <div>{quantity}</div>
      <button onClick={increaseQuantity}>+</button>
      <button
        onClick={() =>
          updateCart({
            name: 'Seafood Cocktail',
            quantity: 1,
            price: 20,
          })
        }
      >
        Add {quantity} to order (${finalPrice})
      </button>
    </div>
  )
}

export default Order
