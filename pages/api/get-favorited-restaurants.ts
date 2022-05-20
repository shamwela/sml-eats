import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'

const apiHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    const { userId } = request.body
    if (!userId) {
      return response.status(400).json({ error: 'userId is required' })
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

  return response.status(405).json({ error: 'Method not allowed' })
}

export default apiHandler
