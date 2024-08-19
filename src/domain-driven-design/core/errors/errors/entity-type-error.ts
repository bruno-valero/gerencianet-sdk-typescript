import { UseCaseError } from '../use-case-errors'

export class EntityTypeError extends Error implements UseCaseError {
  constructor(message: string) {
    super(message)
  }
}
