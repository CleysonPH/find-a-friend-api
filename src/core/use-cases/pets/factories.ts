import { PrismaOrgRepository } from '@/core/repositories/orgs/prisma-org-repository'
import { PrismaPetRepository } from '@/core/repositories/pets/prisma-pet-repository'
import { CreatePetUseCase } from './create'
import { SearchPetUseCase } from './search'

export function makeCreatePetUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const petRepository = new PrismaPetRepository()
  return new CreatePetUseCase(orgRepository, petRepository)
}

export function makeSearchPetUseCase() {
  const petRepository = new PrismaPetRepository()
  return new SearchPetUseCase(petRepository)
}
