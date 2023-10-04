import { type ZodObject, z } from 'zod'

export class ZodValidatorAdapter {
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
