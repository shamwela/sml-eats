import { type Session } from '@prisma/client'
import { type Request, Response, NextFunction } from 'express'
import { prisma } from '../prisma/prismaClient'

const authenticationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorizationHeader = request.headers.authorization
  if (!authorizationHeader) {
    return response.status(403).json({
      message: 'No authorization header. Please sign out and sign in again.',
    })
  }
  if (!authorizationHeader.startsWith('sessionId')) {
    return response.status(403).json({
      message:
        'Invalid authorization header. Please sign out and sign in again.',
    })
  }
  const sessionId = authorizationHeader.split(' ')[1]
  if (!sessionId) {
    return response
      .status(403)
      .json({ message: 'No session ID. Please sign out and sign in again.' })
  }
  if (typeof sessionId !== 'string') {
    return response.status(403).json({
      message:
        'Session ID should be a string. Please sign out and sign in again.',
    })
  }

  let sessionObject: Session | null
  try {
    sessionObject = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    })
  } catch {
    return response.status(403).json({
      message: 'Database error. Please try again later.',
    })
  }
  if (!sessionObject) {
    return response.status(403).json({
      message: 'Invalid session ID. Please sign out and sign in again.',
    })
  }
  const { userId } = sessionObject
  const user = {
    id: userId,
    sessionId,
  }
  request.user = user
  next()
}

export default authenticationMiddleware
