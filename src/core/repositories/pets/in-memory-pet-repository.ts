import { Prisma, Pet } from '@prisma/client'
import { FindAllParams, PetRepository } from '.'
import { randomUUID } from 'node:crypto'
import { InMemoryOrgRepository } from '../orgs/in-memory-org-repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  constructor(private readonly orgRepository: InMemoryOrgRepository) {}

  async findAll({
    city,
    age,
    energyLevel,
    environment,
    size,
  }: FindAllParams): Promise<Pet[]> {
    const orgs = await this.orgRepository.findByCity(city)

    return this.items
      .filter((item) => orgs.some((org) => org.id === item.orgId))
      .filter((item) => (age ? item.age === age : true))
      .filter((item) => (energyLevel ? item.energyLevel === energyLevel : true))
      .filter((item) => (environment ? item.environment === environment : true))
      .filter((item) => (size ? item.size === size : true))
  }

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
