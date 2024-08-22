import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/api/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('', { onRequest: [verifyJWT] }, create)
}
