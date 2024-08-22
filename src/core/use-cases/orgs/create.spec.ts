import { InMemoryOrgRepository } from '@/core/repositories/orgs/in-memory-org-repository'
import { FakeCepService } from '@/core/services/cep/fake'
import { BCryptPasswordEnconderService } from '@/core/services/password-encoder/bcrypt'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create'
import { OrgAlreadyExistsError } from '../errors/OrgAlreadyExistsError'
import { CepNotFoundError } from '@/core/services/cep/errors/CepNotFoundError'

let cepService: FakeCepService
let orgRepository: InMemoryOrgRepository
let passwordEncoderService: BCryptPasswordEnconderService

let sut: CreateOrgUseCase

describe('Create Org', () => {
  beforeEach(() => {
    cepService = new FakeCepService()
    orgRepository = new InMemoryOrgRepository()
    passwordEncoderService = new BCryptPasswordEnconderService()
    sut = new CreateOrgUseCase(
      cepService,
      orgRepository,
      passwordEncoderService,
    )
  })

  it('should create an org', async () => {
    const { org } = await sut.execute({
      cep: '01001000',
      email: 'john.doe@example.com',
      inChargeName: 'John Doe',
      latitude: -23.550131230571267,
      longitude: -46.63340868491241,
      name: 'TypeScript Org',
      password: 'senha@123',
      whatsapp: '11989691378',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be able to hash the password', async () => {
    const { org } = await sut.execute({
      cep: '01001000',
      email: 'john.doe@example.com',
      inChargeName: 'John Doe',
      latitude: -23.550131230571267,
      longitude: -46.63340868491241,
      name: 'TypeScript Org',
      password: 'senha@123',
      whatsapp: '11989691378',
    })

    const isPasswordCorrectlyHashed = await passwordEncoderService.compare(
      org.password,
      'senha@123',
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should be able to get the correct cep info', async () => {
    const { org } = await sut.execute({
      cep: '01001000',
      email: 'john.doe@example.com',
      inChargeName: 'John Doe',
      latitude: -23.550131230571267,
      longitude: -46.63340868491241,
      name: 'TypeScript Org',
      password: 'senha@123',
      whatsapp: '11989691378',
    })

    const address = await cepService.getAddressByCep('01001000')

    expect(org).toEqual(
      expect.objectContaining({
        state: address.state,
        city: address.city,
        neighborhood: address.neighborhood,
        street: address.street,
      }),
    )
  })

  it('should not be able to create with the same email twice', async () => {
    await sut.execute({
      cep: '01001000',
      email: 'john.doe@example.com',
      inChargeName: 'John Doe',
      latitude: -23.550131230571267,
      longitude: -46.63340868491241,
      name: 'TypeScript Org',
      password: 'senha@123',
      whatsapp: '11989691378',
    })

    await expect(
      sut.execute({
        cep: '01001000',
        email: 'john.doe@example.com',
        inChargeName: 'John Doe',
        latitude: -23.550131230571267,
        longitude: -46.63340868491241,
        name: 'TypeScript Org',
        password: 'senha@123',
        whatsapp: '11989691378',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should not be able to create with unexistent cep', async () => {
    await expect(
      sut.execute({
        cep: '01001001',
        email: 'john.doe@example.com',
        inChargeName: 'John Doe',
        latitude: -23.550131230571267,
        longitude: -46.63340868491241,
        name: 'TypeScript Org',
        password: 'senha@123',
        whatsapp: '11989691378',
      }),
    ).rejects.toBeInstanceOf(CepNotFoundError)
  })
})
