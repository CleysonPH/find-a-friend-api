import { Pet, Prisma } from '@prisma/client'

export interface FindAllParams {
  city: string
  age?: string
  energyLevel?: string
  size?: string
  environment?: string
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findAll(params: FindAllParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
