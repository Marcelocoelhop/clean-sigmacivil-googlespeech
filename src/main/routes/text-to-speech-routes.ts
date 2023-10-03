import { makeConvertTextToAudioBase64Controller } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/speech', adaptRoute(makeConvertTextToAudioBase64Controller()))
}
