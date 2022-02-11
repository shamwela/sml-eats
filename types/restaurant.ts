import type { Item } from './item'

type ImageProperties = {
  src: StaticImageData
}

export type Restaurant = {
  name: string
  slug: string
  path: string
  category: string
  rating: number
  imageProperties: ImageProperties
  items: Item[]
}
