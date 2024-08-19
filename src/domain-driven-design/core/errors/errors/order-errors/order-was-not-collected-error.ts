import { UseCaseError } from '@/core/errors/use-case-errors'

export class OrderWasNotCollectedError extends Error implements UseCaseError {
  constructor() {
    super(`this order is awaiting for pickup`)
  }
}
