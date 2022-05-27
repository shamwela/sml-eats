import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'

const apiHandler: NextApiHandler = async (request, response) => {
  const { method, body } = request

  if (method === 'PUT') {
    const { restaurantId, userId } = body
    if (!restaurantId || !userId) {
      return response
        .status(400)
        .json({ error: 'Both restaurantId and userId are required' })
    }
    await prisma.restaurantsOnUsers.deleteMany({
      where: {
        restaurantId,
        userId,
      },
    })
    return response.status(200).json({ success: true })
  } else {
    return response.status(405).json({ error: 'Method not allowed' })
  }
}

export default apiHandler
