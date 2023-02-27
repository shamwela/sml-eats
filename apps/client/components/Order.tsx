import { useState } from 'react'
import { type CartItem } from 'types/cartItem'
import { useRouter } from 'next/router'
import { type Item } from 'types/item'
import { type NestedOption } from 'types/nestedOption'
import QuantityChanger from 'components/QuantityChanger'
import { useAppDispatch } from 'store/hooks'
import { add } from 'store/cartSlice'
import { useIsEnglish } from 'hooks/useIsEnglish'

type OrderProps = {
  item: Item
  oneItemPrice: number
  selectedOptions: NestedOption[]
}

const Order = ({ item, oneItemPrice, selectedOptions }: OrderProps) => {
  const [quantity, setQuantity] = useState(1)
  const finalPrice = oneItemPrice * quantity

  const router = useRouter()
  const dispatch = useAppDispatch()

  const isEnglish = useIsEnglish()
  const addToOrderText = isEnglish
    ? `Add ${quantity} to order`
    : `${quantity}ခုမှာမယ်`
  const finalText = `${addToOrderText} ($${finalPrice})`

  const addToOrder = () => {
    const newCartItem: CartItem = {
      ...item,
      quantity,
      oneItemPrice,
      finalPrice,
      selectedOptions,
    }
    dispatch(add(newCartItem))

    router.back()
  }

  return (
    <div className='flex items-center gap-x-4'>
      <QuantityChanger quantity={quantity} setQuantity={setQuantity} />
      <button
        onClick={addToOrder}
        className='max-w-full w-full'
        data-cy='order-button'
      >
        {finalText}
      </button>
    </div>
  )
}

export default Order
