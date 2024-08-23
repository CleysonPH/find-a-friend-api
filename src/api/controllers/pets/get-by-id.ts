import { ResourceNotFoundError } from '@/core/use-cases/errors/resource-not-found-error'
import { makeGetPetByIdUseCase } from '@/core/use-cases/pets/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramSchema.parse(request.params)

  const useCase = makeGetPetByIdUseCase()

  try {
    const { pet } = await useCase.execute({ id })

    reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
