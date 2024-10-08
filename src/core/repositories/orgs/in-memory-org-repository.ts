import { Org, Prisma } from '@prisma/client'
import { OrgRepository } from '.'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = []

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.items.findIndex((item) => item.email === email) > -1
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = {
      id: randomUUID(),
      cep: data.cep,
      city: data.city,
      email: data.email,
      inChargeName: data.inChargeName,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      name: data.name,
      neighborhood: data.neighborhood,
      password: data.password,
      state: data.state,
      street: data.street,
      whatsapp: data.whatsapp,
    }

    this.items.push(org)

    return org
  }

  async findByCity(city: string): Promise<Org[]> {
    return this.items.filter((item) => item.city === city)
  }
}
