import type { Option } from './option'

export type Item = {
  name: string
  slug: string
  slugs: string[] // This is for [...slug].tsx
  path: string
  imageSource: StaticImageData
  category: string
  deliveryFee: number
  deliveryTime: number
  basePrice: number
  options: Option[]
}
