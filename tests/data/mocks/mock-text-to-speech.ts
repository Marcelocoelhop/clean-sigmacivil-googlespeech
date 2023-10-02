import { type TextToSpeech } from '@/data/contracts'

import { faker } from '@faker-js/faker'

export class TextToSpeechSpy implements TextToSpeech {
  input?: string
  output = faker.string.uuid()

  async perform(text: string): Promise<string> {
    this.input = text
    return this.output
  }
}
