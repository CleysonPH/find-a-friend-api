import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/api/middlewares/verify-jwt'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post('', { onRequest: [verifyJWT] }, create)
  app.get('', search)
}
