import { UseCaseError } from '@/core/errors/use-case-errors'

export class OrderAlreadyCollectedError extends Error implements UseCaseError {
  constructor() {
    super(`this order was already collected`)
  }
}
