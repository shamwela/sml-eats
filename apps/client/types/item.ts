export type Item = {
  id: number
  name: string
  slug: string
  path: string
  imageSource: string
  imageWidth: number
  imageHeight: number
  description: string
  basePrice: number
  restaurantId: number | null
  categoryId: number
}
