import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'

const apiHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    const { userId } = request.body
    if (!userId) {
      return response.status(400).json({ error: 'userId is required' })
    }

    await prisma.user.upsert({
      where: {
        id: userId,
      },
      // If the user already exists, do nothing
      update: {},
      // If the user doesn't exist, create a new user
      create: {
        id: userId,
      },
    })
    return response.status(200).json({ success: true })
  }

  return response.status(405).json({ error: 'Method not allowed' })
}

export default apiHandler
