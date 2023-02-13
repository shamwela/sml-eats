import { type ReactNode } from 'react'

const ItemContainer = ({ children }: { children: ReactNode }) => (
  <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>{children}</div>
)

export default ItemContainer
