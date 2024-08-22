export class CepNotFoundError extends Error {
  constructor(message: string = 'CEP not found') {
    super(message)
  }
}
