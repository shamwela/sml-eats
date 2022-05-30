import { createContext } from 'react'
import type { User } from 'firebase/auth'

type Authentication = {
  user: User | null | undefined
  userLoading: boolean
  userError: Error | undefined
}

export const AuthenticationContext = createContext<Authentication>({
  user: undefined,
  userLoading: true,
  userError: undefined
})
