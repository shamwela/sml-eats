import { prisma } from '../prisma/prismaClient'

export const saveSessionId = async (sessionId: string, userId: string) => {
  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
    },
  })
}
