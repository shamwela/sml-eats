import type { CartItem } from 'types/cartItem'
import Head from 'components/Head'
import Image from 'next/image'
import Pizza from 'ui/Pizza'
import type { Restaurant } from 'types/restaurant'

const SeafoodCocktail = ({
  restaurants,
  addItem,
}: {
  restaurants: Restaurant[]
  addItem: (item: CartItem) => void
}) => {
  const thePizzaCompany = restaurants.find(
    (restaurant) => restaurant.name === 'The Pizza Company'
  )
  const seafoodCocktail = thePizzaCompany?.items.find(
    (item) => item.name === 'Seafood Cocktail'
  )
  const imageSource = seafoodCocktail?.imageSource || ''

  return (
    <>
      <Head
        title='Seafood Cocktail'
        description='Seafood Cocktail'
        imageUrl='/images/seafood-cocktail.jpeg'
      />
      <h1>Seafood Cocktail</h1>
      <div className='max-w-md'>
        <Image alt='Seafood Cocktail' src={imageSource} placeholder='blur' />
      </div>
      <Pizza pizza={seafoodCocktail} addItem={addItem} />
    </>
  )
}

export default SeafoodCocktail
