import { Prisma, Org } from '@prisma/client'
import { OrgRepository } from '.'
import { prisma } from '@/config/prisma'

export class PrismaOrgRepository implements OrgRepository {
  async existsByEmail(email: string): Promise<boolean> {
    return await prisma.org.findUnique({ where: { email } }).then(Boolean)
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    return await prisma.org.create({ data })
  }
}
