import { saveSessionId } from './../utilities/saveSessionId'
import bcrypt from 'bcrypt'
import { prisma } from '../prisma/prismaClient'
import { randomUUID } from 'crypto'
import type { Request, Response } from 'express'
import type { User } from '@prisma/client'

export const signup = async (request: Request, response: Response) => {
  const email = request.body.email.toLowerCase()
  const { password } = request.body

  let existingUser: User | null = null
  try {
    existingUser = await prisma.user.findUnique({ where: { email } })
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' })
  }
  if (existingUser) {
    return response.status(400).json({
      message: `You already have an account with the email ${email}. Please sign in instead.`,
    })
  }

  const saltRounds = 10
  let hashedPassword = ''
  try {
    hashedPassword = await bcrypt.hash(password, saltRounds)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Server error occurred.' })
  }
  const userId = randomUUID()
  const newUser = { id: userId, email, password: hashedPassword }
  try {
    await prisma.user.create({ data: newUser })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Server error occurred.' })
  }

  // To also sign in
  const sessionId = randomUUID()
  try {
    await saveSessionId(sessionId, userId)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Server error.' })
  }

  return response.status(201).json({ message: 'Account created.', sessionId })
}

export const signin = async (request: Request, response: Response) => {
  const { email, password } = request.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return response
      .status(400)
      .json({ message: `No account with the email ${email}.` })
  }
  const passwordInTheDatabase = user.password
  const passwordMatched = await bcrypt.compare(password, passwordInTheDatabase)
  if (!passwordMatched) {
    return response.status(400).json({ message: 'Wrong password.' })
  }
  const userId = user.id
  const sessionId = randomUUID()
  try {
    await saveSessionId(sessionId, userId)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Server error.' })
  }

  return response.status(200).json({ message: 'Signed in.', sessionId })
}
