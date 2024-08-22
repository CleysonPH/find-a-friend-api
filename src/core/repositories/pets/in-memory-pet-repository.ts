import { Prisma, Pet } from '@prisma/client'
import { PetRepository } from '.'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      environment: data.environment,
      orgId: data.orgId,
    }

    this.items.push(pet)

    return pet
  }
}
