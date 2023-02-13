import { type AnyZodObject } from 'zod'
import { type Request, Response, NextFunction } from 'express'

export const validate =
  (schema: AnyZodObject) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const { body } = request
    try {
      await schema.parseAsync({ body })
      return next()
    } catch (error) {
      return response.status(400).json(error)
    }
  }
