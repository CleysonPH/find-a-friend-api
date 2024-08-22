import { Address, CepService } from '.'
import { CepNotFoundError } from './errors/CepNotFoundError'

export class FakeCepService implements CepService {
  async getAddressByCep(cep: string): Promise<Address> {
    if (cep === '01001000') {
      return {
        city: 'São Paulo',
        neighborhood: 'Sé',
        state: 'SP',
        street: 'Praça da Sé',
      }
    }

    throw new CepNotFoundError()
  }
}
