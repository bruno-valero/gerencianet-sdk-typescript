import { UseCaseError } from '@/core/errors/use-case-errors'

export class InvalidAttachmentTypeError extends Error implements UseCaseError {
  constructor(type: string) {
    super(`attachment type "${type}" is not allowed`)
  }
}
