import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'

const apiHandler: NextApiHandler = async (request, response) => {
  const { restaurantId, userId } = request.body
  if (!restaurantId || !userId) {
    return response
      .status(400)
      .json({ error: 'Both restaurantId and userId are required' })
  }

  if (request.method === 'POST') {
    await prisma.restaurantsOnUsers.upsert({
      where: {
        restaurantId_userId: {
          restaurantId,
          userId,
        },
      },
      update: {},
      create: {
        restaurantId,
        userId,
      },
    })
  } else if (request.method === 'DELETE') {
    await prisma.restaurantsOnUsers.deleteMany({
      where: {
        restaurantId,
        userId,
      },
    })
  }
  return response.status(405).json({ error: 'Method not allowed' })
}

export default apiHandler
