import { getCategories } from './../controllers/category'
import express from 'express'

const categoryRouter = express.Router()
categoryRouter.get('/', getCategories)

export default categoryRouter
