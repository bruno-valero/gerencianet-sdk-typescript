import { UseCaseError } from '@/core/errors/use-case-errors'

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`student ${identifier} already exists.`)
  }
}
