import { Address, CepService } from '.'

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
}

export class ViaCepService implements CepService {
  async getAddressByCep(cep: string): Promise<Address> {
    const url = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(url)
    const body = (await response.json()) as ViaCepAddress

    return {
      city: body.localidade,
      neighborhood: body.bairro,
      state: body.uf,
      street: body.logradouro,
    }
  }
}
