import { InMemoryOrgRepository } from '@/core/repositories/orgs/in-memory-org-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetRepository } from '@/core/repositories/pets/in-memory-pet-repository'
import { makeOrg, makePet } from 'tests/factories'
import { GetPetByIdUseCase } from './get-by-id'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository

let sut: GetPetByIdUseCase

describe('Get Pet By Id', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new GetPetByIdUseCase(petRepository)
  })

  it('should be able to get pet by id', async () => {
    const org = await orgRepository.create(makeOrg())
    const pet = await petRepository.create(makePet({ orgId: org.id }))

    const foundPet = await sut.execute({ id: pet.id })

    expect(foundPet.pet).toBe(pet)
  })

  it('should not be able to get pet by id with unexistent id', async () => {
    await expect(sut.execute({ id: 'unexistent-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
