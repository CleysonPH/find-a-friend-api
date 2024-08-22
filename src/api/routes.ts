import { FastifyInstance } from 'fastify'
import { pingRoutes } from './controllers/ping/routes'

export async function apiRoutes(app: FastifyInstance) {
  app.register(pingRoutes, { prefix: '/api' })
}
