import { type Option, Input } from '@prisma/client'

export type NestedOption = Option & {
  inputs: Input[]
}
