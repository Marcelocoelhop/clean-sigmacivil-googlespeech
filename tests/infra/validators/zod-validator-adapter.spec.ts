import { faker } from '@faker-js/faker'
import { type ZodObject, z } from 'zod'

class ZodValidatorAdapter {
  private schema: ZodObject<any, 'strip', z.ZodTypeAny, any, any>
  constructor(private readonly fieldName: string) {
    this.schema = z.object({})
  }

  string(): ZodObject<any, 'strip', z.ZodTypeAny, any, any> {
    this.schema = this.schema.extend({
      [this.fieldName]: z.string(),
    })
    return this.schema
  }
}

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
