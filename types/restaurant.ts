import type { Item } from './item'

export type Restaurant = {
  name: string
  slug: string
  path: string
  category: string
  rating: number
  imageSource: StaticImageData
  location: string
  items: Item[]
}
