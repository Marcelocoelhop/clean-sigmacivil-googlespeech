import { ZodValidatorAdapter } from '@/infra/validators'

import { type AnyZodObject } from 'zod'

export const makeConvertTextToAudioBase64Validation = (): AnyZodObject => {
  return new ZodValidatorAdapter('text').string()
}
