import type { Option } from './option'

export type Item = {
  name: string
  slug: string
  path: string // Added this because I don't want to do complex logic inside
  imageSource: StaticImageData
  description: string
  category: string
  basePrice: number
  options?: Option[]
}
