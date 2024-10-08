import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3333),
  BCRYPT_SALTS: z.coerce.number().default(6),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
