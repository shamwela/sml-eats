import React from 'react'

const ItemContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='grid grid-cols-2 gap-4 md:grid-cols-4'>
      {children}
    </section>
  )
}

export default ItemContainer
