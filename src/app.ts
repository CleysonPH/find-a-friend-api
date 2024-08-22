import fastify from 'fastify'
import { apiRoutes } from './api/routes'

export const app = fastify()

app.register(apiRoutes)
