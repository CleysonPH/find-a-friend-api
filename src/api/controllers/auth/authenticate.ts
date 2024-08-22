import { InvalidCredentialsError } from '@/core/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrgUseCase } from '@/core/use-cases/orgs/facotries'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const data = bodySchema.parse(request.body)

  const useCase = makeAuthenticateOrgUseCase()

  try {
    const { org } = await useCase.execute(data)

    const token = await reply.jwtSign({}, { sign: { sub: org.id } })

    return reply.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
