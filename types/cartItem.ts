import type { Item } from '@prisma/client'
import type { NestedOption } from './nestedOption'

export type CartItem = Item & {
  oneItemPrice: number // oneItemPrice = basePrice + additionalPrice(s)
  quantity: number
  finalPrice: number
  selectedOptions: NestedOption[]
}
