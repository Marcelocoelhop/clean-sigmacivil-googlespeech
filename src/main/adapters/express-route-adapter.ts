import { type HttpRequest, type Controller } from '@/presentation/contracts'

import { type Request, type Response } from 'express'

export const adaptRoute = (controller: Controller): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.status).json(httpResponse.body)
  }
}
