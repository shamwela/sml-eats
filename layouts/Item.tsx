type ItemLayoutProps = {
  children: React.ReactNode
}

const ItemLayout = ({ children }: ItemLayoutProps) => {
  return (
    <section className='mx-auto flex max-w-md flex-col gap-4'>
      {children}
    </section>
  )
}

export default ItemLayout
