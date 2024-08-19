import { UseCaseError } from '@/core/errors/use-case-errors'

export class AttachmentNotFoundError extends Error implements UseCaseError {
  constructor(attachmentId: string) {
    super(`attachment ${attachmentId} not found on db`)
  }
}
