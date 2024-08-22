import { OrgRepository } from '@/core/repositories/orgs'
import { CepService } from '@/core/services/cep'
import { PasswordEncoderService } from '@/core/services/password-encoder'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

export interface CreateOrgUseCaseInput {
  name: string
  inChargeName: string
  email: string
  whatsapp: string
  password: string
  cep: string
  latitude: number
  longitude: number
}

export interface CreateOrgUseCaseOutput {
  org: Org
}

export class CreateOrgUseCase {
  constructor(
    private readonly cepService: CepService,
    private readonly orgRepository: OrgRepository,
    private readonly passwordEncoder: PasswordEncoderService,
  ) {}

  async execute({
    name,
    inChargeName,
    email,
    whatsapp,
    password,
    cep,
    latitude,
    longitude,
  }: CreateOrgUseCaseInput): Promise<CreateOrgUseCaseOutput> {
    const emailAlreadyInUse = await this.orgRepository.existsByEmail(email)

    if (emailAlreadyInUse) {
      throw new OrgAlreadyExistsError()
    }

    const hashedPassword = await this.passwordEncoder.hash(password)

    const { street, city, neighborhood, state } =
      await this.cepService.getAddressByCep(cep)

    const org = await this.orgRepository.create({
      cep,
      city,
      email,
      inChargeName,
      latitude,
      longitude,
      name,
      neighborhood,
      password: hashedPassword,
      state,
      street,
      whatsapp,
    })

    return { org }
  }
}
