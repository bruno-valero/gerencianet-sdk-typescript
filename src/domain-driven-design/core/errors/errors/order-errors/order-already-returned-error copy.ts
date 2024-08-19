import { UseCaseError } from '@/core/errors/use-case-errors'

export class OrderAlreadyReturnedError extends Error implements UseCaseError {
  constructor() {
    super(`this order was already returned`)
  }
}
