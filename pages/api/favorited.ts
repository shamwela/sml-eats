import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'

const apiHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    const { restaurantId, userId } = request.body
    if (!restaurantId || !userId) {
      return response
        .status(400)
        .json({ error: 'Both restaurantId and userId are required' })
    }

    const restaurantUserObject = await prisma.restaurantsOnUsers.findFirst({
      where: {
        restaurantId,
        userId,
      },
    })

    // If the row exists, that means the user has already favorited the restaurant
    if (restaurantUserObject) {
      return response.status(200).json({ favorited: true })
    } else {
      return response.status(200).json({ favorited: false })
    }
  }
}

export default apiHandler
