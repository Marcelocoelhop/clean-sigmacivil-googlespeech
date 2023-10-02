import { ConvertTextToAudioBase64 } from '@/data/usecases'
import { TextToSpeechSpy } from '@/tests/data/mocks'

import { faker } from '@faker-js/faker'

interface SutOutput {
  sut: ConvertTextToAudioBase64
  textToSpeechSpy: TextToSpeechSpy
}

const makeSut = (): SutOutput => {
  const textToSpeechSpy = new TextToSpeechSpy()
  const sut = new ConvertTextToAudioBase64(textToSpeechSpy)
  return {
    sut,
    textToSpeechSpy,
  }
}

describe('ConvertTextToAudioBase64', () => {
  it('should call TextToSpeech with correct data', async () => {
    const { sut, textToSpeechSpy } = makeSut()
    const text = faker.lorem.words()

    await sut.perform(text)

    expect(textToSpeechSpy.input).toBe(text)
  })

  it('should return a correct audio url on success', async () => {
    const { sut, textToSpeechSpy } = makeSut()
    textToSpeechSpy.output = faker.string.uuid()

    const audioUrl = await sut.perform(faker.lorem.words())

    expect(audioUrl).toBe(textToSpeechSpy.output)
  })

  it('should throw if TextToSpeech throws', async () => {
    const { sut, textToSpeechSpy } = makeSut()
    jest.spyOn(textToSpeechSpy, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(faker.lorem.words())

    await expect(promise).rejects.toThrowError()
  })
})
