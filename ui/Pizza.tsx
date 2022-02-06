import { ChangeEvent, useState } from 'react'

import type { CartItem } from 'types/cartItem'
import type { Item } from 'types/item'
import Order from 'ui/Order'

const crusts = [
  {
    name: 'Crispy Thin',
    additionalPrice: 0,
  },
  {
    name: 'Extra Cheesy Sausage Bites',
    additionalPrice: 3,
  },
  {
    name: 'Extreme',
    additionalPrice: 3,
  },
  {
    name: 'Pan',
    additionalPrice: 2,
  },
]

const sizes = [
  {
    name: 'Large',
    additionalPrice: 5,
  },
  {
    name: 'Medium',
    additionalPrice: 3,
  },
  {
    name: 'Small',
    additionalPrice: 0,
  },
]

const PizzaOptions = ({
  pizza,
  addItem,
}: {
  pizza: Item | undefined
  addItem: (item: CartItem) => void
}) => {
  const handleCrust = (event: ChangeEvent<HTMLInputElement>) => {
    const crustPrice = Number(event.target.value)
    setCrustPrice(crustPrice)
  }

  const [crustPrice, setCrustPrice] = useState(0)
  const [sizePrice, setSizePrice] = useState(0)

  if (!pizza) {
    return null
  }
  const { basePrice } = pizza

  const additionalPrice = crustPrice + sizePrice
  const oneItemPrice = basePrice + additionalPrice

  const handleSizePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const sizePrice = Number(event.target.value)
    setSizePrice(sizePrice)
  }

  return (
    <>
      <h2>Choose crust</h2>
      {crusts.map(
        ({
          name,
          additionalPrice,
        }: {
          name: string
          additionalPrice: number
        }) => {
          return (
            <div key={name} className='flex items-center gap-x-4'>
              <input
                name='crust'
                type='radio'
                id={name}
                value={additionalPrice}
                onChange={handleCrust}
                defaultChecked={additionalPrice === 0 && true}
              />
              <label htmlFor={name}>{name}</label>
              <div>+${additionalPrice}</div>
            </div>
          )
        }
      )}

      <h2>Choose size</h2>
      {sizes.map(
        ({
          name,
          additionalPrice,
        }: {
          name: string
          additionalPrice: number
        }) => {
          return (
            <div key={name} className='flex items-center gap-x-4'>
              <input
                name='size'
                type='radio'
                id={name}
                value={additionalPrice}
                onChange={handleSizePrice}
                defaultChecked={additionalPrice === 0 && true}
              />
              <label htmlFor={name}>{name}</label>
              <div>+${additionalPrice}</div>
            </div>
          )
        }
      )}

      <Order item={pizza} oneItemPrice={oneItemPrice} addItem={addItem} />
    </>
  )
}

export default PizzaOptions
