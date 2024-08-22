import { app } from '@/app'
import { prisma } from '@/config/prisma'
import request from 'supertest'
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from 'vitest'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await prisma.org.create({
      data: {
        cep: '01001000',
        email: 'john.doe@example.com',
        inChargeName: 'John Doe',
        latitude: -23.550131230571267,
        longitude: -46.63340868491241,
        name: 'TypeScript Org',
        password:
          '$2a$06$Kul5tYnx3oRtxfx3jvhDH.0.n1eF8gFV.tRBaN0FST575MU.G5t3W', // senha@123
        whatsapp: '11989691378',
        city: 'São Paulo',
        neighborhood: 'Sé',
        state: 'SP',
        street: 'Praça da Sé',
      },
    })
  })

  afterEach(async () => {
    await prisma.$queryRawUnsafe('DELETE FROM "pets"')
    await prisma.$queryRawUnsafe('DELETE FROM "orgs"')
  })

  it('should be able to create a pet', async () => {
    const authResponse = await request(app.server)
      .post('/api/auth/token')
      .send({
        email: 'john.doe@example.com',
        password: 'senha@123',
      })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post('/api/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Buddy',
        about: 'Friendly and playful',
        age: 'cub',
        size: 'nedium',
        energyLevel: 'high',
        environment: 'wide',
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      pet: expect.objectContaining({
        id: expect.any(String),
      }),
    })
    expect(response.body.org).toBeUndefined()
  })

  it('should not be able to create a pet without been authenticated', async () => {
    const response = await request(app.server).post('/api/pets').send({
      name: 'Buddy',
      about: 'Friendly and playful',
      age: 'cub',
      size: 'nedium',
      energyLevel: 'high',
      environment: 'wide',
    })

    expect(response.status).toBe(401)
  })

  it('should not be able to create a pet with invalid org id in token', async () => {
    const authResponse = await request(app.server)
      .post('/api/auth/token')
      .send({
        email: 'john.doe@example.com',
        password: 'senha@123',
      })

    const { token } = authResponse.body

    await prisma.$queryRawUnsafe('DELETE FROM "orgs"')

    const response = await request(app.server)
      .post('/api/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Buddy',
        about: 'Friendly and playful',
        age: 'cub',
        size: 'nedium',
        energyLevel: 'high',
        environment: 'wide',
      })

    expect(response.status).toBe(404)
  })
})
