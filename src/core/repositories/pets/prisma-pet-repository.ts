import { Prisma, Pet } from '@prisma/client'
import { FindAllParams, PetRepository } from '.'
import { prisma } from '@/config/prisma'

export class PrismaPetRepository implements PetRepository {
  async findById(id: string): Promise<Pet | null> {
    return await prisma.pet.findUnique({ where: { id } })
  }

  async findAll({
    city,
    age,
    energyLevel,
    environment,
    size,
  }: FindAllParams): Promise<Pet[]> {
    return await prisma.pet.findMany({
      where: {
        org: {
          city: {
            contains: city,
            mode: 'insensitive',
          },
        },
        age,
        environment,
        energyLevel,
        size,
      },
    })
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return await prisma.pet.create({ data })
  }
}
