import type { Item } from './item'

export type Restaurant = {
  name: string
  slug: string
  path: string
  category: string
  rating: 1 | 2 | 3 | 4 | 5
  items: Item[]
}
