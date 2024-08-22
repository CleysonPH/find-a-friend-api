import { hash as bcryptjsHash, compare as bcryptjsCompare } from 'bcryptjs'
import { PasswordEncoderService } from '.'
import { env } from '@/config/env'

export class BCryptPasswordEnconderService implements PasswordEncoderService {
  async hash(rawPassword: string): Promise<string> {
    return await bcryptjsHash(rawPassword, env.BCRYPT_SALTS)
  }

  async compare(hashedPassword: string, rawPassword: string): Promise<boolean> {
    return await bcryptjsCompare(rawPassword, hashedPassword)
  }
}
