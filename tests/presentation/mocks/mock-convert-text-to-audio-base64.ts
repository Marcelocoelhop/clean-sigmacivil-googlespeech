import { type UseCase } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export class ConvertTextToAudioBase64Spy implements UseCase {
  input?: string
  output = faker.lorem.words()

  async perform(text: string): Promise<string> {
    this.input = text
    return this.output
  }
}
