import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'

const apiHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    const restaurantId = request.body.restaurantId as number
    const userId = request.body.userId as string
    console.log(prisma.restaurantsOnUsers)

    await prisma.restaurantsOnUsers.create({
      data: {
        restaurantId: restaurantId,
        userId: userId,
      },
    })
  }
}

export default apiHandler
