import type { Category } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'
import type { Request, Response } from 'express'

export const getCategories = async (request: Request, response: Response) => {
  let categories: Category[]
  try {
    categories = await prisma.category.findMany()
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Could not get categories.' })
  }
  return response.json(categories)
}
