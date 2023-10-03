import { type UseCase } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

interface HttpRequest {
  body: any
}

interface HttpResponse {
  status: number
  body?: any
}

interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

class ConvertTextToAudioBase64Controller implements Controller {
  constructor(private readonly convertTextToAudioBase64: UseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { text } = httpRequest.body
    await this.convertTextToAudioBase64.perform(text)
  }
}

class ConvertTextToAudioBase64Mock implements UseCase {
  input?: string
  output = faker.lorem.words()

  async perform(text: string): Promise<string> {
    this.input = text
    return this.output
  }
}

describe('ConvertTextToAudioBase64Controller', () => {
  it('should call ConvertTextToAudioBase64 with correct data', async () => {
    const convertTextToAudioBase64Mock = new ConvertTextToAudioBase64Mock()
    const sut = new ConvertTextToAudioBase64Controller(
      convertTextToAudioBase64Mock
    )
    const text = faker.lorem.words()

    await sut.handle({
      body: {
        text,
      },
    })

    expect(convertTextToAudioBase64Mock.input).toBe(text)
  })
})
