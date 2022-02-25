import { ReactNode } from 'react'

const ItemContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className='grid grid-cols-2 gap-4 md:grid-cols-4'>
      {children}
    </section>
  )
}

export default ItemContainer
