import type { Restaurant, Item, Category } from '@prisma/client'

type RestaurantWithCategory = Restaurant & { category: Category }
type ItemWithCategory = Item & { category: Category }

export type NestedRestaurant = RestaurantWithCategory & {
  items: ItemWithCategory[]
}
