import type { ReactNode } from 'react'

type ItemContainerProps = {
  children: ReactNode
}

const ItemContainer = ({ children }: ItemContainerProps) => {
  return (
    <section className='grid grid-cols-2 gap-4 md:grid-cols-4'>
      {children}
    </section>
  )
}

export default ItemContainer
