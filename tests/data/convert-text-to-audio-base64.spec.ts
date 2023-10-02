import { type UseCase } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

class ConvertTextToAudioBase64 implements UseCase {
  constructor(private readonly textToSpeech: TextToSpeechMock) {}

  async perform(text: string): Promise<string> {
    return await this.textToSpeech.perform(text)
  }
}

interface TextToSpeech {
  perform: (text: string) => Promise<string>
}

class TextToSpeechMock implements TextToSpeech {
  input?: string
  output = faker.string.uuid()

  async perform(text: string): Promise<string> {
    this.input = text
    return this.output
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

  it('should return a correct audio url on success', async () => {
    const textToSpeechMock = new TextToSpeechMock()
    const fakeAudioUrl = faker.string.uuid()
    textToSpeechMock.output = fakeAudioUrl
    const sut = new ConvertTextToAudioBase64(textToSpeechMock)

    const audioUrl = await sut.perform(faker.lorem.words())

    expect(audioUrl).toBe(textToSpeechMock.output)
  })

  it('should throw if TextToSpeech throws', async () => {
    const textToSpeechMock = new TextToSpeechMock()
    jest.spyOn(textToSpeechMock, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new ConvertTextToAudioBase64(textToSpeechMock)

    const promise = sut.perform(faker.lorem.words())

    await expect(promise).rejects.toThrowError()
  })
})
