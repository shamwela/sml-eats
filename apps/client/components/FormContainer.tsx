import { type ReactNode } from 'react'

const FormContainer = ({ children }: { children: ReactNode }) => (
  <div className='flex flex-col gap-y-4 items-center mx-auto w-64'>
    {children}
  </div>
)

export default FormContainer
