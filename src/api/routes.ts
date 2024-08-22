import { FastifyInstance } from 'fastify'
import { pingRoutes } from './controllers/ping/routes'
import { authRoutes } from './controllers/auth/routes'

export async function apiRoutes(app: FastifyInstance) {
  app.register(pingRoutes, { prefix: '/ping' })
  app.register(authRoutes, { prefix: '/auth' })
}
