import { type User } from '../user'

// To make the file a module and avoid the TypeScript error
export {}

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
