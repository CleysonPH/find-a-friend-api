import { makeSearchPetUseCase } from '@/core/use-cases/pets/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    energyLevel: z.string().optional(),
    size: z.string().optional(),
    environment: z.string().optional(),
  })

  const query = querySchema.parse(request.query)

  const useCase = makeSearchPetUseCase()

  const { pets } = await useCase.execute(query)

  reply.status(200).send({ pets })
}
