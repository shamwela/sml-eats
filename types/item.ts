import type { Option } from './option'

export type Item = {
  name: string
  slug: string
  path: string
  imageSource: StaticImageData
  category: string
  deliveryFee: number
  deliveryTime: number
  basePrice: number
  options: Option[]
}
