import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'

const apiHandler: NextApiHandler = async (request, response) => {
  const {method} = request
  if (method === 'POST') {
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

    // If this object is not undefined, then the user has already favorited this restaurant
    if (restaurantUserObject) {
      return response.status(200).json({ favorited: true })
    } else {
      return response.status(200).json({ favorited: false })
    }
  }

  return response.status(405).json({ error: 'Method not allowed' })
}

export default apiHandler
