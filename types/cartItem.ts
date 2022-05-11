import type { Item, Option, Input } from '@prisma/client'

export interface CartItem extends Item {
  oneItemPrice: number // oneItemPrice = basePrice + additionalPrice(s)
  quantity: number
  finalPrice: number
  selectedOptions: (Option & { inputs: Input[] })[]
}
