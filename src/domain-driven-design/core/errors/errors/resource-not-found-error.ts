import { UseCaseError } from '../use-case-errors'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('resource not found.')
  }
}
