import type { Item } from '@prisma/client'
import type { NestedOption } from './nestedOption'

export type NestedItem = Item & {
  options: NestedOption[]
}
