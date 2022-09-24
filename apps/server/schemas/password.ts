import { z } from 'zod'

export const passwordSchema = z
  .string({ required_error: 'Password is required.' })
  .min(8, { message: 'Password should be at least 8 characters long.' })
  .max(128, { message: 'Password cannot be longer than 128 characters.' })

