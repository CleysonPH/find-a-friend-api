import fastify from 'fastify'
import { apiRoutes } from './api/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './config/env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.JWT_EXPIRES_IN,
  },
})

app.register(apiRoutes, { prefix: '/api' })
