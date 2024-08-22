import { app } from '@/app'
import { prisma } from '@/config/prisma'
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'

describe('Register Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await prisma.$queryRawUnsafe('DELETE FROM "orgs"')
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

  it('should not be able to register with an existent email', async () => {
    await request(app.server).post('/api/auth/register').send({
      cep: '01001000',
      email: 'john.doe@example.com',
      inChargeName: 'John Doe',
      latitude: -23.550131230571267,
      longitude: -46.63340868491241,
      name: 'TypeScript Org',
      password: 'senha@123',
      whatsapp: '11989691378',
    })

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

    expect(response.status).toBe(409)
  })

  it('should not be able to register with a unexistent cep', async () => {
    const response = await request(app.server).post('/api/auth/register').send({
      cep: '00000000',
      email: 'john.doe@example.com',
      inChargeName: 'John Doe',
      latitude: -23.550131230571267,
      longitude: -46.63340868491241,
      name: 'TypeScript Org',
      password: 'senha@123',
      whatsapp: '11989691378',
    })

    expect(response.status).toBe(400)
  })
})
