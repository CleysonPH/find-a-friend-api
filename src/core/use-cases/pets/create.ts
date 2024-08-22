import { OrgRepository } from '@/core/repositories/orgs'
import { Pet } from '@prisma/client'
import { PetRepository } from '@/core/repositories/pets'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface CreatePetUseCaseInput {
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  environment: string
  orgId: string
}

export interface CreatePetUseCaseOutput {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private readonly orgRepository: OrgRepository,
    private readonly petRepository: PetRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    orgId,
  }: CreatePetUseCaseInput): Promise<CreatePetUseCaseOutput> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError('Org not found')
    }

    const pet = await this.petRepository.create({
      about,
      age,
      energyLevel,
      environment,
      name,
      orgId,
      size,
    })

    return { pet }
  }
}
