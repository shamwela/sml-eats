import { getFavoritedRestaurants } from '../controllers/user'
import express from 'express'

const userRouter = express.Router()
userRouter.get('/favorited-restaurants', getFavoritedRestaurants)

export default userRouter
