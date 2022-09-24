import { z } from 'zod'
import { emailSchema } from './email'
import { passwordSchema } from './password'

export const bodySchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
})
