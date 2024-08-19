import { UseCaseError } from '@/core/errors/use-case-errors'

export class OrderNotAwaitingPickupError extends Error implements UseCaseError {
  constructor() {
    super(`this order is not awaiting for pickup`)
  }
}
