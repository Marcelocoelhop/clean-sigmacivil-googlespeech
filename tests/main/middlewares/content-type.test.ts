import { setupApp } from '@/main/config'

import request from 'supertest'

const app = setupApp()

describe('contentType', () => {
  it('should return a content type correct', async () => {
    app.get('/test_content_type', (req, res) => {
      return res.send()
    })

    const response = await request(app).get('/test_content_type')

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
  })
})
