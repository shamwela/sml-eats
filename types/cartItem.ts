import type { Item } from './item'
import type { Option } from './option'

export interface CartItem extends Item {
  oneItemPrice: number // oneItemPrice = basePrice + additionalPrice(s)
  quantity: number
  finalPrice: number
  selectedOptions: Option[]
}
