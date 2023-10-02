import { type UseCase } from '@/domain/usecases'

import { type TextToSpeech } from '@/data/contracts'

export class ConvertTextToAudioBase64 implements UseCase {
  constructor(private readonly textToSpeech: TextToSpeech) {}

  async perform(text: string): Promise<string> {
    return await this.textToSpeech.perform(text)
  }
}
