export interface PasswordEncoderService {
  hash(rawPassword: string): Promise<string>
  compare(hashedPassword: string, rawPassword: string): Promise<boolean>
}
