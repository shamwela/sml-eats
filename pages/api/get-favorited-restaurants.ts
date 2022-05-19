import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'

const apiHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    const userId = request.body.userId as string
    const favoritedRestaurants = await prisma.restaurant.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    })

    response.json(favoritedRestaurants)
  }
}

export default apiHandler
