import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'

const apiHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    const restaurantId = request.body.restaurantId as number
    const userId = request.body.userId as string

    const restaurantUserObject = await prisma.restaurantsOnUsers.findFirst({
      where: {
        restaurantId,
        userId,
      },
    })

    // If the restaurant is already on the user's favorites, do nothing
    if (restaurantUserObject) {
      return
    } else {
      await prisma.restaurantsOnUsers.create({
        data: {
          restaurantId,
          userId,
        },
      })
    }
  } else if (request.method === 'DELETE') {
    const restaurantId = request.body.restaurantId as number
    const userId = request.body.userId as string

    await prisma.restaurantsOnUsers.deleteMany({
      where: {
        restaurantId,
        userId,
      },
    })
  }
}

export default apiHandler
