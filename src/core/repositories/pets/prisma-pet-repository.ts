import { Prisma, Pet } from '@prisma/client'
import { PetRepository } from '.'
import { prisma } from '@/config/prisma'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return await prisma.pet.create({ data })
  }
}
