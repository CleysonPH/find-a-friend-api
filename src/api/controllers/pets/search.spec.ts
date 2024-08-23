import { app } from '@/app'
import { prisma } from '@/config/prisma'
import request from 'supertest'
import { makeOrg, makePet } from 'tests/factories'
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'

describe('Search Pets (E2E)', () => {
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

  it('should be able to search pet by city', async () => {
    const org1 = await prisma.org.create({
      data: makeOrg({ state: 'SP', city: 'São Paulo' }),
    })
    const org2 = await prisma.org.create({
      data: makeOrg({ state: 'PE', city: 'Recife' }),
    })

    for (let i = 0; i < 10; i++) {
      await prisma.pet.create({ data: makePet({ orgId: org1.id }) })
    }

    for (let i = 0; i < 3; i++) {
      await prisma.pet.create({ data: makePet({ orgId: org2.id }) })
    }

    const reficeResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'Recife' })
      .send()

    const saoPauloResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo' })
      .send()

    expect(reficeResponse.status).toBe(200)
    expect(reficeResponse.body.pets).toHaveLength(3)
    expect(saoPauloResponse.status).toBe(200)
    expect(saoPauloResponse.body.pets).toHaveLength(10)
  })

  it('should be able to search pet by city and age', async () => {
    const org1 = await prisma.org.create({
      data: makeOrg({ state: 'SP', city: 'São Paulo' }),
    })

    await prisma.pet.createMany({
      data: [
        makePet({ orgId: org1.id, age: 'cub' }),
        makePet({ orgId: org1.id, age: 'cub' }),
        makePet({ orgId: org1.id, age: 'adult' }),
        makePet({ orgId: org1.id, age: 'adult' }),
        makePet({ orgId: org1.id, age: 'adult' }),
        makePet({ orgId: org1.id, age: 'elder' }),
        makePet({ orgId: org1.id, age: 'elder' }),
        makePet({ orgId: org1.id, age: 'elder' }),
        makePet({ orgId: org1.id, age: 'elder' }),
      ],
    })

    const cubResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', age: 'cub' })
      .send()
    const adultResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', age: 'adult' })
      .send()
    const elderResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', age: 'elder' })
      .send()

    expect(cubResponse.status).toBe(200)
    expect(cubResponse.body.pets).toHaveLength(2)
    expect(adultResponse.status).toBe(200)
    expect(adultResponse.body.pets).toHaveLength(3)
    expect(elderResponse.status).toBe(200)
    expect(elderResponse.body.pets).toHaveLength(4)
  })

  it('should be able to search pet by city and energy level', async () => {
    const org1 = await prisma.org.create({
      data: makeOrg({ state: 'SP', city: 'São Paulo' }),
    })

    await prisma.pet.createMany({
      data: [
        makePet({ orgId: org1.id, energyLevel: 'low' }),
        makePet({ orgId: org1.id, energyLevel: 'medium' }),
        makePet({ orgId: org1.id, energyLevel: 'medium' }),
        makePet({ orgId: org1.id, energyLevel: 'high' }),
        makePet({ orgId: org1.id, energyLevel: 'high' }),
        makePet({ orgId: org1.id, energyLevel: 'high' }),
      ],
    })

    const lowResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', energyLevel: 'low' })
      .send()
    const mediumResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', energyLevel: 'medium' })
      .send()
    const highResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', energyLevel: 'high' })
      .send()

    expect(lowResponse.status).toBe(200)
    expect(lowResponse.body.pets).toHaveLength(1)
    expect(mediumResponse.status).toBe(200)
    expect(mediumResponse.body.pets).toHaveLength(2)
    expect(highResponse.status).toBe(200)
    expect(highResponse.body.pets).toHaveLength(3)
  })

  it('should be able to search pet by city and size', async () => {
    const org1 = await prisma.org.create({
      data: makeOrg({ state: 'SP', city: 'São Paulo' }),
    })

    await prisma.pet.createMany({
      data: [
        makePet({ orgId: org1.id, size: 'small' }),
        makePet({ orgId: org1.id, size: 'small' }),
        makePet({ orgId: org1.id, size: 'small' }),
        makePet({ orgId: org1.id, size: 'medium' }),
        makePet({ orgId: org1.id, size: 'medium' }),
        makePet({ orgId: org1.id, size: 'large' }),
      ],
    })

    const smallResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', size: 'small' })
      .send()
    const mediumResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', size: 'medium' })
      .send()
    const largeResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', size: 'large' })
      .send()

    expect(smallResponse.status).toBe(200)
    expect(smallResponse.body.pets).toHaveLength(3)
    expect(mediumResponse.status).toBe(200)
    expect(mediumResponse.body.pets).toHaveLength(2)
    expect(largeResponse.status).toBe(200)
    expect(largeResponse.body.pets).toHaveLength(1)
  })

  it('should be able to search pet by city and environment', async () => {
    const org1 = await prisma.org.create({
      data: makeOrg({ state: 'SP', city: 'São Paulo' }),
    })

    await prisma.pet.createMany({
      data: [
        makePet({ orgId: org1.id, environment: 'indoor' }),
        makePet({ orgId: org1.id, environment: 'indoor' }),
        makePet({ orgId: org1.id, environment: 'indoor' }),
        makePet({ orgId: org1.id, environment: 'indoor' }),
        makePet({ orgId: org1.id, environment: 'outdoor' }),
        makePet({ orgId: org1.id, environment: 'outdoor' }),
      ],
    })

    const indoorResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', environment: 'indoor' })
      .send()
    const outdoorResponse = await request(app.server)
      .get('/api/pets')
      .query({ city: 'São Paulo', environment: 'outdoor' })
      .send()

    expect(indoorResponse.status).toBe(200)
    expect(indoorResponse.body.pets).toHaveLength(4)
    expect(outdoorResponse.status).toBe(200)
    expect(outdoorResponse.body.pets).toHaveLength(2)
  })
})
