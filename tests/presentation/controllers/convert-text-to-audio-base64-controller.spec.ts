import { ConvertTextToAudioBase64Controller } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers'
import { ConvertTextToAudioBase64Spy } from '@/tests/presentation/mocks'

import { faker } from '@faker-js/faker'

interface SutOutput {
  sut: ConvertTextToAudioBase64Controller
  convertTextToAudioBase64Spy: ConvertTextToAudioBase64Spy
}

const makeSut = (): SutOutput => {
  const convertTextToAudioBase64Spy = new ConvertTextToAudioBase64Spy()
  const sut = new ConvertTextToAudioBase64Controller(
    convertTextToAudioBase64Spy
  )
  return {
    sut,
    convertTextToAudioBase64Spy,
  }
}

describe('ConvertTextToAudioBase64Controller', () => {
  it('should call ConvertTextToAudioBase64 with correct data', async () => {
    const { sut, convertTextToAudioBase64Spy } = makeSut()
    const text = faker.lorem.words()

    await sut.handle({
      body: {
        text,
      },
    })

    expect(convertTextToAudioBase64Spy.input).toBe(text)
  })

  it('should return 200 if ConvertTextToAudioBase64 returns a correct audio url', async () => {
    const { sut, convertTextToAudioBase64Spy } = makeSut()
    const audioUrl = faker.lorem.words()
    convertTextToAudioBase64Spy.output = audioUrl
    const mockResponse = {
      audioUrl,
    }

    const httpResponse = await sut.handle({
      body: {
        text: faker.lorem.words(),
      },
    })

    expect(httpResponse).toEqual(ok(mockResponse))
  })

  it('should return 500 if ConvertTextToAudioBase64 throws', async () => {
    const { sut, convertTextToAudioBase64Spy } = makeSut()
    const error = new Error()
    jest
      .spyOn(convertTextToAudioBase64Spy, 'perform')
      .mockImplementationOnce(() => {
        throw error
      })

    const httpResponse = await sut.handle({
      body: {
        text: faker.lorem.words(),
      },
    })

    expect(httpResponse).toEqual(serverError(error))
  })
})
