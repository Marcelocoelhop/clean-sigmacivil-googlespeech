import {
  makeConvertTextToAudioBase64Controller,
  makeConvertTextToAudioBase64Validation,
} from '@/main/factories/controllers'
import { adaptRoute, adaptValidator } from '@/main/adapters'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post(
    '/speech',
    adaptValidator(makeConvertTextToAudioBase64Validation()),
    adaptRoute(makeConvertTextToAudioBase64Controller())
  )
}
