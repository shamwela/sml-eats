import { type Restaurant } from './restaurant'
import { type Item } from './item'
import { type Category } from './category'

type RestaurantWithCategory = Restaurant & { category: Category }
type ItemWithCategory = Item & { category: Category }

export type NestedRestaurant = RestaurantWithCategory & {
  items: ItemWithCategory[]
}
