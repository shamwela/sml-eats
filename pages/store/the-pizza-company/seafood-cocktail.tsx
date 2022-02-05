import Head from 'components/Head'
import Image from 'next/image'
import type { Item } from 'types/item'
import Pizza from 'ui/Pizza'
import type { Restaurant } from 'types/restaurant'
import SeafoodCocktailImage from 'public/images/seafood-cocktail.jpeg'

const SeafoodCocktail = ({
  restaurants,
  cart,
  updateCart,
}: {
  restaurants: Restaurant[]
  cart: Item[]
  updateCart: (item: Item) => void
}) => {
  // Improve this later
  const seafoodCocktail = restaurants[0].items[0]

  return (
    <>
      <Head
        title='Seafood Cocktail'
        description='Seafood Cocktail'
        imageUrl='/images/seafood-cocktail.jpeg'
      />
      <h1>Seafood Cocktail</h1>
      <div className='max-w-md'>
        <Image
          alt='Seafood Cocktail'
          src={SeafoodCocktailImage}
          placeholder='blur'
        />
      </div>

      <Pizza pizza={seafoodCocktail} updateCart={updateCart} />
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
