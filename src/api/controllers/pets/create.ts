import { ResourceNotFoundError } from '@/core/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/core/use-cases/pets/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    environment: z.string(),
  })

  const data = bodySchema.parse(request.body)

  const useCase = makeCreatePetUseCase()

  try {
    const { pet } = await useCase.execute({
      ...data,
      orgId: request.user.sub,
    })

    return reply.status(201).send({
      pet,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
