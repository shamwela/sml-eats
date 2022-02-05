import Cart from 'ui/Cart'
import type { CartItem } from 'types/cartItem'
import Head from 'components/Head'
import Image from 'next/image'
import Pizza from 'ui/Pizza'
import type { Restaurant } from 'types/restaurant'
import SeafoodCocktailImage from 'public/images/seafood-cocktail.jpeg'

const SeafoodCocktail = ({
  restaurants,
  cart,
  updateCart,
}: {
  restaurants: Restaurant[]
  cart: CartItem[]
  updateCart: (item: CartItem) => void
}) => {
  const thePizzaCompany = restaurants.find(
    (restaurant) => restaurant.name === 'The Pizza Company'
  )
  const seafoodCocktail = thePizzaCompany?.items.find(
    (item) => item.name === 'Seafood Cocktail'
  )

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
      <Cart cart={cart} />
    </>
  )
}

export default SeafoodCocktail
