import { app } from '@/app'
import { prisma } from '@/config/prisma'
import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { makeOrg, makePet } from 'tests/factories'
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'

describe('Get Pet Id (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  afterEach(async () => {
    await prisma.$queryRawUnsafe('DELETE FROM "pets"')
    await prisma.$queryRawUnsafe('DELETE FROM "orgs"')
  })

  it('should be able to get pet by id', async () => {
    const org = await prisma.org.create({
      data: makeOrg({ state: 'SP', city: 'São Paulo' }),
    })

    const pet = await prisma.pet.create({ data: makePet({ orgId: org.id }) })

    const response = await request(app.server).get(`/api/pets/${pet.id}`).send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      pet: expect.objectContaining({
        id: pet.id,
      }),
    })
  })

  it('should not be able to get pet by id with wrong id', async () => {
    const response = await request(app.server)
      .get(`/api/pets/${randomUUID()}`)
      .send()

    expect(response.status).toBe(404)
  })
})
