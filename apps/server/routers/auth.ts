import express from 'express'
import { signup, signin } from '../controllers/authentication'
import { validate } from '../middlewares/validate'
import { signUpSchema, signInSchema } from '../utilities/zod'

const authRouter = express.Router()
authRouter.post('/signup', validate(signUpSchema), signup)
authRouter.post('/signin', validate(signInSchema), signin)

export default authRouter
