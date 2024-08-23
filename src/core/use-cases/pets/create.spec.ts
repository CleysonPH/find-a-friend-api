import { InMemoryOrgRepository } from '@/core/repositories/orgs/in-memory-org-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetRepository } from '@/core/repositories/pets/in-memory-pet-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository

let sut: CreatePetUseCase

describe('Create Pet', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new CreatePetUseCase(orgRepository, petRepository)
  })

  it('should create a pet', async () => {
    const org = await orgRepository.create({
      cep: '01001000',
      email: 'john.doe@example.com',
      inChargeName: 'John Doe',
      latitude: -23.550131230571267,
      longitude: -46.63340868491241,
      name: 'TypeScript Org',
      password: 'senha@123',
      whatsapp: '11989691378',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
    })

    const { pet } = await sut.execute({
      orgId: org.id,
      name: 'Buddy',
      about: 'Friendly and playful',
      age: 'cub',
      size: 'nedium',
      energyLevel: 'high',
      environment: 'wide',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to creat a pet with unexistent org id', async () => {
    await expect(
      sut.execute({
        orgId: 'unexistent-org-id',
        name: 'Buddy',
        about: 'Friendly and playful',
        age: 'cub',
        size: 'nedium',
        energyLevel: 'high',
        environment: 'wide',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
