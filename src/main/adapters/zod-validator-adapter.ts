import { type AnyZodObject } from 'zod'
import { type Request, type Response, type NextFunction } from 'express'

export const adaptValidator = (schema: AnyZodObject): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
