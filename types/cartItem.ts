import type { Item } from './item'

export interface CartItem extends Item {
  oneItemPrice: number // oneItemPrice = basePrice + additionalPrice(s)
  quantity: number
  finalPrice: number
}
