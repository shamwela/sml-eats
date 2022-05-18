import type { NextApiHandler } from 'next'
import { prisma } from 'prisma/prismaClient'

const apiHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    const id = request.body.userId as string

    await prisma.user.upsert({
      where: {
        id,
      },
      // If the user already exists, do nothing
      update: {},
      // If the user doesn't exist, create a new user
      create: {
        id,
      },
    })
  }
}

export default apiHandler
