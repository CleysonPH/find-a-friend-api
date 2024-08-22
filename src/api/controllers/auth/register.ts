import { CepNotFoundError } from '@/core/services/cep/errors/CepNotFoundError'
import { OrgAlreadyExistsError } from '@/core/use-cases/errors/OrgAlreadyExistsError'
import { makeCreateOrgUseCase } from '@/core/use-cases/orgs/facotries'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    cep: z.string().length(8),
    email: z.string().email(),
    inChargeName: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    name: z.string(),
    password: z.string(),
    whatsapp: z.string().length(11),
  })

  const data = bodySchema.parse(request.body)

  const useCase = makeCreateOrgUseCase()

  try {
    const { org } = await useCase.execute(data)

    return reply.status(201).send({
      org: {
        ...org,
        password: undefined,
      },
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof CepNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
