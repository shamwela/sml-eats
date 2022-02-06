import type { Item } from './item'

export interface CartItem extends Item {
  quantity: number
  oneItemPrice: number // oneItemPrice = basePrice + additionalPrice(s)
  finalPrice: number
}
