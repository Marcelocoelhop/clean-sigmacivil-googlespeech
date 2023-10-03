import { setupApp } from '@/main/config'

import request from 'supertest'

const app = setupApp()

describe('cors', () => {
  it('should allow requests from allowed origins', async () => {
    app.get('/cors_test', (req, res) => {
      return res.send()
    })

    const response = await request(app).get('/cors_test').set('Origin', '*')

    expect(response.status).toBe(200)
  })
})
