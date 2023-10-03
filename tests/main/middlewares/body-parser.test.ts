import { setupApp } from '@/main/config'

import request from 'supertest'
import { faker } from '@faker-js/faker'

const app = setupApp()

describe('bodyParser', () => {
  it('should parse JSON correctly', async () => {
    const name = faker.person.firstName()
    app.post('/test_body_parser', (req, res) => {
      return res.send(req.body)
    })

    const response = await request(app).post('/test_body_parser').send({ name })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      name,
    })
  })
})
