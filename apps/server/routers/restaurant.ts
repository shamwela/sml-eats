import { getRestaurants } from './../controllers/restaurant'
import express from 'express'

const restaurantRouter = express.Router()
restaurantRouter.get('/', getRestaurants)

export default restaurantRouter
