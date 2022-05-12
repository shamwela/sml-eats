import type { ReactNode } from 'react'

type ItemContainerProps = {
  children: ReactNode
}

const ItemContainer = ({ children }: ItemContainerProps) => {
  return <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>{children}</div>
}

export default ItemContainer
