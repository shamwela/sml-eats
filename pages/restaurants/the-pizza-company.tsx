import type { Restaurant } from 'types/restaurant'
import RestaurantLayout from 'layouts/RestaurantLayout'

const ThePizzaCompany = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const thePizzaCompany = restaurants.find(
    (restaurant) => restaurant.slug === 'the-pizza-company'
  )

  if (!thePizzaCompany) {
    return <h1>Sorry, The Pizza Company isn't found.</h1>
  } else {
    return <RestaurantLayout restaurant={thePizzaCompany} />
  }
}

export default ThePizzaCompany
