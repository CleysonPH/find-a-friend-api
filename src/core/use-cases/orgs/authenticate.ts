import { OrgRepository } from '@/core/repositories/orgs'
import { PasswordEncoderService } from '@/core/services/password-encoder'
import { Org } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'

export interface AuthenticateOrgUseCaseInput {
  email: string
  password: string
}

export interface AuthenticateOrgUseCaseOutput {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(
    private readonly orgRepository: OrgRepository,
    private readonly passwordEncoder: PasswordEncoderService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseInput): Promise<AuthenticateOrgUseCaseOutput> {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMatches = await this.passwordEncoder.compare(
      org.password,
      password,
    )

    if (!doesPasswordsMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
