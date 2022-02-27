import type { Item } from './item'

export type Restaurant = {
  name: string
  slug: string
  category: string
  rating: number
  imageSource: StaticImageData
  location: string
  deliveryTime: number
  deliveryFee: number
  items: Item[]
}
