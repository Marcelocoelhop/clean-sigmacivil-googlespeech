import { bodyParser } from '@/main/middlewares'

import { type Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
}
