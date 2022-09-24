import express from 'express'
import { signup, signin } from '../controllers/authentication'
import { validate } from '../middlewares/validate'
import { bodySchema } from '../schemas/body'

const authRouter = express.Router()
authRouter.post('/signup', validate(bodySchema), signup)
authRouter.post('/signin', validate(bodySchema), signin)

export default authRouter
