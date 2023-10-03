import { type UseCase } from '@/domain/usecases'

import {
  type HttpRequest,
  type Controller,
  type HttpResponse,
} from '@/presentation/contracts'
import { ok, serverError } from '@/presentation/helpers'

export class ConvertTextToAudioBase64Controller implements Controller {
  constructor(private readonly convertTextToAudioBase64: UseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { text } = httpRequest.body
      const audioUrl = await this.convertTextToAudioBase64.perform(text)
      return ok({ audioUrl })
    } catch (error) {
      return serverError(error)
    }
  }
}
