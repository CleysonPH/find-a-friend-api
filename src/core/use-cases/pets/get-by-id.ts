import { Pet } from '@prisma/client'
import { PetRepository } from '@/core/repositories/pets'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface GetPetByIdUseCaseInput {
  id: string
}

export interface GetPetByIdUseCaseOutput {
  pet: Pet
}

export class GetPetByIdUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({
    id,
  }: GetPetByIdUseCaseInput): Promise<GetPetByIdUseCaseOutput> {
    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError('Pet not found')
    }

    return { pet }
  }
}
