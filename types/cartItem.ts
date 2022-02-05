import type { Item } from './item'

export interface CartItem extends Item {
  quantity: number
  finalPrice: number
}
