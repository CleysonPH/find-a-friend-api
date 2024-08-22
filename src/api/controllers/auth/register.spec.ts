import { app } from '@/app'
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Register Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/api/auth/register').send({
      cep: '01001000',
      email: 'john.doe@example.com',
      inChargeName: 'John Doe',
      latitude: -23.550131230571267,
      longitude: -46.63340868491241,
      name: 'TypeScript Org',
      password: 'senha@123',
      whatsapp: '11989691378',
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      org: expect.objectContaining({
        id: expect.any(String),
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Sé',
        street: 'Praça da Sé',
      }),
    })
    expect(response.body.org.password).toBeUndefined()
  })
})
