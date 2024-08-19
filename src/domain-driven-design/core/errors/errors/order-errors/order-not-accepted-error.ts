import { UseCaseError } from '@/core/errors/use-case-errors'

export class OrderNotAcceptedError extends Error implements UseCaseError {
  constructor() {
    super(`this order has not been accepted yet`)
  }
}
