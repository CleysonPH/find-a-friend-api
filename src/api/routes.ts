import { FastifyInstance } from 'fastify'
import { pingRoutes } from './controllers/ping/routes'
import { authRoutes } from './controllers/auth/routes'
import { petsRoutes } from './controllers/pets/routes'

export async function apiRoutes(app: FastifyInstance) {
  app.register(pingRoutes, { prefix: '/ping' })
  app.register(authRoutes, { prefix: '/auth' })
  app.register(petsRoutes, { prefix: '/pets' })
}
