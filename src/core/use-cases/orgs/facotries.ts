import { PrismaOrgRepository } from '@/core/repositories/orgs/prisma-org-repository'
import { ViaCepService } from '@/core/services/cep/viacep'
import { BCryptPasswordEnconderService } from '@/core/services/password-encoder/bcrypt'
import { CreateOrgUseCase } from './create'

export function makeCreateOrgUseCase() {
  const cepService = new ViaCepService()
  const orgRepository = new PrismaOrgRepository()
  const passwordEncoder = new BCryptPasswordEnconderService()
  return new CreateOrgUseCase(cepService, orgRepository, passwordEncoder)
}
