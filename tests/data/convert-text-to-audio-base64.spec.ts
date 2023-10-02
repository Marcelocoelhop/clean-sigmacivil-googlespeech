import { type UseCase } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

class ConvertTextToAudioBase64 implements UseCase {
  constructor(private readonly textToSpeech: TextToSpeechMock) {}

  async perform(text: string): Promise<UseCase.Result> {
    await this.textToSpeech.perform(text)
    return { audioUrl: '' }
  }
}

interface TextToSpeech {
  perform: (text: string) => Promise<void>
}

class TextToSpeechMock implements TextToSpeech {
  input?: string

  async perform(text: string): Promise<void> {
    this.input = text
  }
}

describe('ConvertTextToAudioBase64', () => {
  it('should call TextToSpeech with correct data', async () => {
    const textToSpeechMock = new TextToSpeechMock()
    const sut = new ConvertTextToAudioBase64(textToSpeechMock)
    const text = faker.lorem.words()

    await sut.perform(text)

    expect(textToSpeechMock.input).toBe(text)
  })
})
