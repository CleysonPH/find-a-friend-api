import { app } from '@/app'
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Ping (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return pong', async () => {
    const response = await request(app.server).get('/api/ping').send()
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      }),
    )
  })
})
