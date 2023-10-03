import { ConvertTextToAudioBase64 } from '@/data/usecases'

import { GoogleTextToSpeechAdapter } from '@/infra'

import { type Controller } from '@/presentation/contracts'
import { ConvertTextToAudioBase64Controller } from '@/presentation/controllers'

export const makeConvertTextToAudioBase64Controller = (): Controller => {
  const textToSpeech = new GoogleTextToSpeechAdapter()
  const convertTextToAudioBase64 = new ConvertTextToAudioBase64(textToSpeech)
  return new ConvertTextToAudioBase64Controller(convertTextToAudioBase64)
}
