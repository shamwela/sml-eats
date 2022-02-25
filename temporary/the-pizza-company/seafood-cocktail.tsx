import type { CartItem } from 'types/cartItem'
import Head from 'components/Head'
import Image from 'next/image'
import Pizza from 'components/Pizza'
import { restaurants } from 'data/restaurants'
import ItemLayout from 'layouts/Item'

const SeafoodCocktail = ({
  addItem,
}: {
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
      <Head title='Seafood Cocktail' imageUrl='/images/seafood-cocktail.jpeg' />

      <ItemLayout>
        <h1>Seafood Cocktail</h1>
        <div className='max-w-md'>
          <Image alt='Seafood Cocktail' src={imageSource} placeholder='blur' />
        </div>
        <Pizza pizza={seafoodCocktail} addItem={addItem} />
      </ItemLayout>
    </>
  )
}

export default SeafoodCocktail
