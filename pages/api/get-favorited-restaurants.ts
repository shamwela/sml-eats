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

    return response.status(200).json(favoritedRestaurants)
  }

  return response.status(405).json({ error: 'Method not allowed' })
}

export default apiHandler
