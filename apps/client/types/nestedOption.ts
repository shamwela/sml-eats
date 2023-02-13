import { type Option } from './option'
import { type Input } from './input'

export type NestedOption = Option & {
  inputs: Input[]
}
