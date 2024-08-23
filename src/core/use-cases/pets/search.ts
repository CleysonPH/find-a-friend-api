import { Pet } from '@prisma/client'
import { PetRepository } from '@/core/repositories/pets'

export interface SearchPetUseCaseInput {
  city: string
  age?: string
  energyLevel?: string
  size?: string
  environment?: string
}

export interface SearchPetUseCaseOutput {
  pets: Pet[]
}

export class SearchPetUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({
    city,
    age,
    energyLevel,
    size,
    environment,
  }: SearchPetUseCaseInput): Promise<SearchPetUseCaseOutput> {
    const pets = await this.petRepository.findAll({
      city,
      age,
      energyLevel,
      size,
      environment,
    })

    return { pets }
  }
}
