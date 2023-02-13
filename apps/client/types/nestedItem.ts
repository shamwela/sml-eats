import { type Item } from './item'
import { type NestedOption } from './nestedOption'

export type NestedItem = Item & {
  options: NestedOption[]
}
