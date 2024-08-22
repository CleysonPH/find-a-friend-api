import { Address, CepService } from '.'
import { CepNotFoundError } from './errors/CepNotFoundError'

interface ViaCepAddress {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro: boolean
}

export class ViaCepService implements CepService {
  async getAddressByCep(cep: string): Promise<Address> {
    const url = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(url)
    const body = (await response.json()) as ViaCepAddress

    if (body.erro) {
      throw new CepNotFoundError()
    }

    return {
      city: body.localidade,
      neighborhood: body.bairro,
      state: body.uf,
      street: body.logradouro,
    }
  }
}
