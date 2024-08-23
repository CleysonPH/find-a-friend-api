import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/api/middlewares/verify-jwt'
import { search } from './search'
import { getById } from './get-by-id'

export async function petsRoutes(app: FastifyInstance) {
  app.post('', { onRequest: [verifyJWT] }, create)
  app.get('', search)
  app.get('/:id', getById)
}
