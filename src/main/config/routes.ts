import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use(router)
  readdirSync(path.join(__dirname, '../routes')).map(async (file) => {
    const route = await import(`../routes/${file}`)
    route.default(router)
  })
}
