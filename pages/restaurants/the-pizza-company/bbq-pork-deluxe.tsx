import type { CartItem } from 'types/cartItem'
import Head from 'components/Head'
import Image from 'next/image'
import Pizza from 'components/Pizza'
import { restaurants } from 'data/restaurants'

const BBQPorkDeluxe = ({ addItem }: { addItem: (item: CartItem) => void }) => {
  const thePizzaCompany = restaurants.find(
    (restaurant) => restaurant.name === 'The Pizza Company'
  )
  const bbqPorkDeluxe = thePizzaCompany?.items.find(
    (item) => item.name === 'BBQ Pork Deluxe'
  )
  const imageSource = bbqPorkDeluxe?.imageSource || ''

  return (
    <>
      <Head title='BBQ Pork Deluxe' imageUrl='/images/bbq-pork-deluxe.jpeg' />
      <h1>BBQ Pork Deluxe</h1>
      <div className='max-w-md'>
        <Image alt='BBQ Pork Deluxe' src={imageSource} placeholder='blur' />
      </div>
      <Pizza pizza={bbqPorkDeluxe} addItem={addItem} />
    </>
  )
}

export default BBQPorkDeluxe
