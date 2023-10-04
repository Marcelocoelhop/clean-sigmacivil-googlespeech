import { ZodValidatorAdapter } from '@/infra/validators'

import { faker } from '@faker-js/faker'

describe('ZodValidatorAdapter', () => {
  it('should throw if is not a string', () => {
    const fieldName = faker.lorem.word()
    const sut = new ZodValidatorAdapter(fieldName)

    const schema = sut.string()

    expect(() => {
      schema.parse({ [fieldName]: faker.number.int(1) })
    }).toThrow()
  })

  it('should pass if the value is a string', () => {
    const fieldName = faker.lorem.word()
    const sut = new ZodValidatorAdapter(fieldName)

    const schema = sut.string()

    expect(() => {
      schema.parse({ [fieldName]: faker.lorem.words() })
    }).not.toThrow()
  })
})
