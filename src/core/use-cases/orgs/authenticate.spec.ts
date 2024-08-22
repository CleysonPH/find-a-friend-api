import { InMemoryOrgRepository } from '@/core/repositories/orgs/in-memory-org-repository'
import { BCryptPasswordEnconderService } from '@/core/services/password-encoder/bcrypt'
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let orgRepository: InMemoryOrgRepository
let passwordEncoderService: BCryptPasswordEnconderService

let sut: AuthenticateOrgUseCase

describe('Authenticate Org', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    passwordEncoderService = new BCryptPasswordEnconderService()
    sut = new AuthenticateOrgUseCase(orgRepository, passwordEncoderService)
  })

  it('should be able to authenticate', async () => {
    orgRepository.create({
      cep: '01001000',
      email: 'john.doe@example.com',
      inChargeName: 'John Doe',
      latitude: -23.550131230571267,
      longitude: -46.63340868491241,
      name: 'TypeScript Org',
      password: await passwordEncoderService.hash('senha@123'),
      whatsapp: '11989691378',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
    })

    const { org } = await sut.execute({
      email: 'john.doe@example.com',
      password: 'senha@123',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with a wrong email', async () => {
    await expect(
      sut.execute({
        email: 'john.doe@example.com',
        password: 'senha@123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    orgRepository.create({
      cep: '01001000',
      email: 'john.doe@example.com',
      inChargeName: 'John Doe',
      latitude: -23.550131230571267,
      longitude: -46.63340868491241,
      name: 'TypeScript Org',
      password: await passwordEncoderService.hash('senha@123'),
      whatsapp: '11989691378',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
    })

    await expect(
      sut.execute({
        email: 'john.doe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
