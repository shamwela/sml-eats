import { ChangeEvent, useState } from 'react'

import Image from 'next/image'
import type { Item } from 'types/item'
import SeafoodCocktailImage from 'public/images/seafood-cocktail.jpeg'

const SeafoodCocktail = ({
  restaurants,
  cart,
  updateCart,
}: {
  restaurants: any
  cart: Item[]
  updateCart: (item: Item) => void
}) => {
  const { basePrice, options } = restaurants[0].items[0]

  const [crustPrice, setCrustPrice] = useState(0)
  const [sizePrice, setSizePrice] = useState(0)

  const additionalPrice = crustPrice + sizePrice
  const oneItemPrice = basePrice + additionalPrice

  const [quantity, setQuantity] = useState(1)
  const finalPrice = oneItemPrice * quantity

  const handleCrust = (event: ChangeEvent<HTMLInputElement>) => {
    const crustPrice = Number(event.target.value)
    setCrustPrice(crustPrice)
  }

  const handleSizePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const sizePrice = Number(event.target.value)
    setSizePrice(sizePrice)
  }

  return (
    <>
      <h1>Seafood Cocktail</h1>
      <div className='max-w-md'>
        <Image
          alt='Seafood Cocktail'
          src={SeafoodCocktailImage}
          placeholder='blur'
        />
      </div>

      <h2>Choose crust</h2>
      {options.crusts.map(
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
      {options.sizes.map(
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

      <div className='flex items-center gap-x-4'>
        <button
          onClick={() =>
            setQuantity((previousQuantity) => {
              if (previousQuantity === 1) {
                return 1
              } else {
                return previousQuantity - 1
              }
            })
          }
        >
          -
        </button>
        <div>{quantity}</div>
        <button
          onClick={() =>
            setQuantity((previousQuantity) => previousQuantity + 1)
          }
        >
          +
        </button>
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

      <h2>Cart</h2>
      {!cart && <p>Your cart is empty.</p>}
      {cart?.map(({ name, quantity, price }) => {
        return (
          <div key={name}>
            <p>
              {name} - {quantity} x ${price}
            </p>
          </div>
        )
      })}
    </>
  )
}

export default SeafoodCocktail
