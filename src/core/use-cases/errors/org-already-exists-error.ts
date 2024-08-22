export class OrgAlreadyExistsError extends Error {
  constructor(message: string = 'Email already in use') {
    super(message)
  }
}
