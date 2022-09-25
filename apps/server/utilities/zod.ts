import { z } from 'zod'

const name = z
  .string({ required_error: 'Name is required.' })
  .regex(/^[A-Za-z\s]*$/, { message: 'Please use English alphabets only.' })
  .min(3, { message: 'Name should be at least 3 characters long.' })
  .max(100, { message: 'Name should not be longer than 100 characters.' })

const email = z
  .string({ required_error: 'Email is required.' })
  .email({ message: 'Invalid email address.' })
  .min(3, {
    message: 'Email should be at least 3 characters long.',
  })
  .max(254, {
    message: 'Email should not be longer than 254 characters.',
  })

const password = z
  .string({ required_error: 'Password is required.' })
  .min(8, { message: 'Password should be at least 8 characters long.' })
  .max(128, { message: 'Password should not be longer than 128 characters.' })

export const signUpSchema = z.object({
  body: z.object({
    name,
    email,
    password,
  }),
})

export const signInSchema = z.object({
  body: z.object({
    email,
    password,
  }),
})
