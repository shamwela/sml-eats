import type { Option } from './option'

export type Item = {
  name: string
  slug: string
  slugs: string[] // This is for [...slug].tsx
  path: string // Added this because I don't want to do complex logic inside
  imageSource: StaticImageData
  category: string
  basePrice: number
  options: Option[]
}
