import { ChangeEvent, useEffect, useState } from 'react'

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
  const { basePrice } = restaurants[0].items[0]

  const [quantity, setQuantity] = useState(1)
  const [finalPrice, setFinalPrice] = useState(basePrice)

  const handleCheck = (
    event: ChangeEvent<HTMLInputElement>,
    additionalPrice: number
  ) => {
    if (event.target.checked) {
      setFinalPrice(finalPrice + additionalPrice)
    } else {
      setFinalPrice(finalPrice - additionalPrice)
    }
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

      {restaurants[0].items[0].options.crusts.map(
        ({ name, additionalPrice }: any) => {
          return (
            <div key={name} className='flex items-center gap-x-4'>
              <input
                type='checkbox'
                onChange={(event) => handleCheck(event, additionalPrice)}
              />
              <label>{name}</label>
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
          Add {quantity} to order ({finalPrice})
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
