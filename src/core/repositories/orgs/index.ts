import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  existsByEmail(email: string): Promise<boolean>
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
}
