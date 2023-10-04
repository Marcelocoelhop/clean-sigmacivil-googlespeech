import swaggerDocument from '@/main/docs/swagger.json'

import { type Express } from 'express'
import swaggerUi from 'swagger-ui-express'

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
