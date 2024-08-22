export interface Address {
  state: string
  city: string
  neighborhood: string
  street: string
}

export interface CepService {
  getAddressByCep(cep: string): Promise<Address>
}
