import { InMemoryOrgRepository } from '@/core/repositories/orgs/in-memory-org-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetRepository } from '@/core/repositories/pets/in-memory-pet-repository'
import { SearchPetUseCase } from './search'
import { makeOrg, makePet } from 'tests/factories'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository

let sut: SearchPetUseCase

describe('Search Pets', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new SearchPetUseCase(petRepository)
  })

  it('should be able to search pets by city', async () => {
    const org1 = await orgRepository.create(makeOrg())
    const org2 = await orgRepository.create(makeOrg())

    for (let i = 1; i <= 10; i++) {
      await petRepository.create(makePet({ orgId: org1.id }))
    }

    for (let i = 1; i <= 5; i++) {
      await petRepository.create(makePet({ orgId: org2.id }))
    }

    const { pets: petsFromOrg1 } = await sut.execute({ city: org1.city })

    expect(petsFromOrg1).toHaveLength(10)

    const { pets: petsFromOrg2 } = await sut.execute({ city: org2.city })

    expect(petsFromOrg2).toHaveLength(5)
  })

  it('should be able to search pets by city and age', async () => {
    const org = await orgRepository.create(makeOrg())

    await petRepository.create(makePet({ orgId: org.id, age: 'cub' }))
    await petRepository.create(makePet({ orgId: org.id, age: 'adult' }))
    await petRepository.create(makePet({ orgId: org.id, age: 'adult' }))
    await petRepository.create(makePet({ orgId: org.id, age: 'elder' }))
    await petRepository.create(makePet({ orgId: org.id, age: 'elder' }))
    await petRepository.create(makePet({ orgId: org.id, age: 'elder' }))

    const { pets: cubPets } = await sut.execute({
      city: org.city,
      age: 'cub',
    })

    expect(cubPets).toHaveLength(1)

    const { pets: adultPets } = await sut.execute({
      city: org.city,
      age: 'adult',
    })

    expect(adultPets).toHaveLength(2)

    const { pets: elderPets } = await sut.execute({
      city: org.city,
      age: 'elder',
    })

    expect(elderPets).toHaveLength(3)
  })

  it('should be able to search pet by city and energyLevel', async () => {
    const org = await orgRepository.create(makeOrg())

    await petRepository.create(makePet({ orgId: org.id, energyLevel: 'low' }))
    await petRepository.create(makePet({ orgId: org.id, energyLevel: 'low' }))
    await petRepository.create(makePet({ orgId: org.id, energyLevel: 'low' }))
    await petRepository.create(makePet({ orgId: org.id, energyLevel: 'low' }))
    await petRepository.create(
      makePet({ orgId: org.id, energyLevel: 'medium' }),
    )
    await petRepository.create(
      makePet({ orgId: org.id, energyLevel: 'medium' }),
    )
    await petRepository.create(makePet({ orgId: org.id, energyLevel: 'high' }))
    await petRepository.create(makePet({ orgId: org.id, energyLevel: 'high' }))
    await petRepository.create(makePet({ orgId: org.id, energyLevel: 'high' }))
    await petRepository.create(makePet({ orgId: org.id, energyLevel: 'high' }))
    await petRepository.create(makePet({ orgId: org.id, energyLevel: 'high' }))

    const { pets: lowPets } = await sut.execute({
      city: org.city,
      energyLevel: 'low',
    })

    expect(lowPets).toHaveLength(4)

    const { pets: mediumPets } = await sut.execute({
      city: org.city,
      energyLevel: 'medium',
    })

    expect(mediumPets).toHaveLength(2)

    const { pets: highPets } = await sut.execute({
      city: org.city,
      energyLevel: 'high',
    })

    expect(highPets).toHaveLength(5)
  })

  it('should be able to search pet by city and size', async () => {
    const org = await orgRepository.create(makeOrg())

    await petRepository.create(makePet({ orgId: org.id, size: 'small' }))
    await petRepository.create(makePet({ orgId: org.id, size: 'medium' }))
    await petRepository.create(makePet({ orgId: org.id, size: 'medium' }))
    await petRepository.create(makePet({ orgId: org.id, size: 'medium' }))
    await petRepository.create(makePet({ orgId: org.id, size: 'large' }))
    await petRepository.create(makePet({ orgId: org.id, size: 'large' }))
    await petRepository.create(makePet({ orgId: org.id, size: 'large' }))
    await petRepository.create(makePet({ orgId: org.id, size: 'large' }))
    await petRepository.create(makePet({ orgId: org.id, size: 'large' }))
    await petRepository.create(makePet({ orgId: org.id, size: 'large' }))

    const { pets: smallPets } = await sut.execute({
      city: org.city,
      size: 'small',
    })

    expect(smallPets).toHaveLength(1)

    const { pets: mediumPets } = await sut.execute({
      city: org.city,
      size: 'medium',
    })

    expect(mediumPets).toHaveLength(3)

    const { pets: largePets } = await sut.execute({
      city: org.city,
      size: 'large',
    })

    expect(largePets).toHaveLength(6)
  })

  it('should be able to search pet by city and environment', async () => {
    const org = await orgRepository.create(makeOrg())

    await petRepository.create(
      makePet({ orgId: org.id, environment: 'indoor' }),
    )
    await petRepository.create(
      makePet({ orgId: org.id, environment: 'indoor' }),
    )
    await petRepository.create(
      makePet({ orgId: org.id, environment: 'indoor' }),
    )
    await petRepository.create(
      makePet({ orgId: org.id, environment: 'outdoor' }),
    )
    await petRepository.create(
      makePet({ orgId: org.id, environment: 'outdoor' }),
    )

    const { pets: indoorPets } = await sut.execute({
      city: org.city,
      environment: 'indoor',
    })

    expect(indoorPets).toHaveLength(3)

    const { pets: outdoorPets } = await sut.execute({
      city: org.city,
      environment: 'outdoor',
    })

    expect(outdoorPets).toHaveLength(2)
  })
})
