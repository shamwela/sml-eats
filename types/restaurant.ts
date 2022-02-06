import type { Item } from './item'

export type Restaurant = {
  name: string
  slug: string
  rating: 1 | 2 | 3 | 4 | 5
  items: Item[]
}
