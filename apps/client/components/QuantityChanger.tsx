import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import { type Dispatch, SetStateAction } from 'react'

const QuantityChanger = ({
  quantity,
  setQuantity,
}: {
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
}) => {
  const decreaseQuantity = () => {
    setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <>
      <button
        aria-label='Decrease quantity'
        disabled={quantity === 1 && true}
        onClick={decreaseQuantity}
        className='bg-light-primary rounded-full p-2'
      >
        <MinusIcon />
      </button>
      <span data-testid='quantity'>{quantity}</span>
      <button
        aria-label='Increase quantity'
        onClick={increaseQuantity}
        className='bg-light-primary rounded-full p-2'
      >
        <PlusIcon />
      </button>
    </>
  )
}

export default QuantityChanger
