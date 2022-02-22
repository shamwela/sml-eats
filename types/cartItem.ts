import type { Item } from './item'
import type { SelectedOption } from './selectedOptions'

export interface CartItem extends Item {
  oneItemPrice: number // oneItemPrice = basePrice + additionalPrice(s)
  quantity: number
  finalPrice: number
  selectedOptions: SelectedOption[]
}
