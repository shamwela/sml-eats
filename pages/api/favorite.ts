import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'
import { withSentry } from '@sentry/nextjs'

const apiHandler: NextApiHandler = async (request, response) => {
  const { method, body } = request

  if (method === 'POST') {
    const { restaurantId, userId } = body
    if (!restaurantId || !userId) {
      return response
        .status(400)
        .json({ error: 'Both restaurantId and userId are required' })
    }
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
    return response.status(200).json({ success: true })
  } else {
    return response.status(405).json({ error: 'Method not allowed' })
  }
}

export default withSentry(apiHandler)
