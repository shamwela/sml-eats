import BBQPorkDeluxeImage from 'public/images/bbq-pork-deluxe.jpeg'
import Cart from 'ui/Cart'
import type { CartItem } from 'types/cartItem'
import Head from 'components/Head'
import Image from 'next/image'
import Pizza from 'ui/Pizza'
import type { Restaurant } from 'types/restaurant'

const BBQPorkDeluxe = ({
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
  const bbqPorkDeluxe = thePizzaCompany?.items.find(
    (item) => item.name === 'BBQ Pork Deluxe'
  )

  return (
    <>
      <Head
        title='BBQ Pork Deluxe'
        description='BBQ Pork Deluxe'
        imageUrl='/images/bbq-pork-deluxe.jpeg'
      />
      <h1>BBQ Pork Deluxe</h1>
      <div className='max-w-md'>
        <Image
          alt='BBQ Pork Deluxe'
          src={BBQPorkDeluxeImage}
          placeholder='blur'
        />
      </div>
      <Pizza pizza={bbqPorkDeluxe} updateCart={updateCart} />
      <Cart cart={cart} />
    </>
  )
}

export default BBQPorkDeluxe
