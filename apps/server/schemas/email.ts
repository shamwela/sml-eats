import { z } from 'zod'

export const emailSchema = z
  .string({ required_error: 'Email is required.' })
  .email({ message: 'Invalid email address.' })
  .min(3, {
    message: 'Email should be at least 3 characters long.',
  })
  .max(254, {
    message: 'Email cannot be longer than 254 characters.',
  })
