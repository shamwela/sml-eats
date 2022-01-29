import Image from 'next/image'
import type { Item } from 'types/item'
import SeafoodCocktailImage from 'public/images/seafood-cocktail.jpeg'

const SeafoodCocktail = ({
  cart,
  updateCart,
}: {
  cart: Item[]
  updateCart: (item: Item) => void
}) => {
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
      <button
        onClick={() =>
          updateCart({
            name: 'Seafood Cocktail',
            quantity: 1,
            price: 20,
          })
        }
      >
        Add 1 to order
      </button>

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
