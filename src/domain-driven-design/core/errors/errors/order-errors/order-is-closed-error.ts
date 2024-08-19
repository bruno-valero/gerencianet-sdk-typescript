import { UseCaseError } from '@/core/errors/use-case-errors'

export class OrderIsClosedError extends Error implements UseCaseError {
  constructor() {
    super(`this order was already closed`)
  }
}
