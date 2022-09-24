import { prisma } from '../prisma/prismaClient'
import type { Request, Response } from 'express'

export const getFavoritedRestaurants = async (
  request: Request,
  response: Response
) => {
  const { user } = request
  if (!user) {
    return response
      .status(400)
      .json({ message: 'The request object does not have the user object.' })
  }
  const userId = user.id
  if (!userId) {
    return response.status(400).json({ message: 'No user ID.' })
  }
  if (typeof userId !== 'string') {
    return response.status(400).json({ message: 'userId should be a string.' })
  }

  const favoritedRestaurants = await prisma.restaurant.findMany({
    where: {
      users: {
        some: {
          userId,
        },
      },
    },
  })
  return response.status(200).json(favoritedRestaurants)
}
