import { createContext } from 'react'

export const UserErrorContext = createContext<Error | undefined>(undefined)
