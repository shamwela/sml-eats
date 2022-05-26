import { createContext } from 'react'
import type { User } from 'firebase/auth'

export const UserContext = createContext<User | null | undefined>(undefined)
