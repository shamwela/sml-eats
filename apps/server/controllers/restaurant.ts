import { type Restaurant } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'
import type { Request, Response } from 'express'
import { type NestedRestaurant } from '../types/nestedRestaurant'

export const getRestaurants = async (request: Request, response: Response) => {
  const includeItems = Boolean(request.query.includeItems)
  let restaurants: NestedRestaurant[] | Restaurant[]

  try {
    if (includeItems) {
      restaurants = (await prisma.restaurant.findMany({
        include: {
          category: true,
          items: {
            include: {
              category: true,
            },
          },
        },
      })) as NestedRestaurant[]
    } else {
      restaurants = (await prisma.restaurant.findMany()) as Restaurant[]
    }
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Could not get restaurants.' })
  }
  return response.json(restaurants)
}
