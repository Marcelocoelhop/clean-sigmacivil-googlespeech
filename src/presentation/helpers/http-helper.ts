import { type HttpResponse } from '@/presentation/contracts'

export const ok = (data: any): HttpResponse => ({
  status: 200,
  body: data,
})

export const serverError = (error: Error): HttpResponse => ({
  status: 500,
  body: {
    error: {
      name: error.name,
      message: error.message,
    },
  },
})
