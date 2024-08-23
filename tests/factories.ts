import { fakerPT_BR as faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

interface OrgOverwrite {
  state?: string
  city?: string
  neighborhood?: string
  street?: string
  cep?: string
  email?: string
  inChargeName?: string
  latitude?: number
  longitude?: number
  name?: string
  password?: string
  whatsapp?: string
}

export function makeOrg(overwrite?: OrgOverwrite) {
  return {
    state: overwrite?.state ?? faker.location.state({ abbreviated: true }),
    city: overwrite?.city ?? faker.location.city(),
    neighborhood: overwrite?.neighborhood ?? faker.location.streetAddress(),
    street: overwrite?.street ?? faker.location.street(),
    cep: overwrite?.cep ?? faker.location.zipCode({ format: '########' }),
    email: overwrite?.email ?? faker.internet.email(),
    inChargeName: overwrite?.inChargeName ?? faker.person.fullName(),
    latitude: overwrite?.latitude ?? faker.location.latitude(),
    longitude: overwrite?.longitude ?? faker.location.longitude(),
    name: overwrite?.name ?? faker.company.name(),
    password: overwrite?.password ?? faker.internet.password(),
    whatsapp: overwrite?.whatsapp ?? faker.phone.number(),
  }
}

interface PetOverwrite {
  name?: string
  about?: string
  age?: 'cub' | 'adult' | 'elder'
  size?: 'small' | 'medium' | 'large'
  energyLevel?: 'low' | 'medium' | 'high'
  environment?: 'indoor' | 'outdoor'
  orgId?: string
}

export function makePet(overwrite?: PetOverwrite) {
  return {
    name: overwrite?.name ?? faker.animal.dog(),
    about: overwrite?.about ?? faker.lorem.paragraph(),
    age:
      overwrite?.age ?? faker.helpers.arrayElement(['cub', 'adult', 'elder']),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large']),
    energyLevel:
      overwrite?.energyLevel ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment:
      overwrite?.environment ??
      faker.helpers.arrayElement(['indoor', 'outdoor']),
    orgId: overwrite?.orgId ?? randomUUID(),
  }
}
