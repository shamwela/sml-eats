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

    // If the row exists, that means the user has already favorited the restaurant
    if (restaurantUserObject) {
      response.json({ favorited: true })
    } else {
      response.json({ favorited: false })
    }
  }
}

export default apiHandler
