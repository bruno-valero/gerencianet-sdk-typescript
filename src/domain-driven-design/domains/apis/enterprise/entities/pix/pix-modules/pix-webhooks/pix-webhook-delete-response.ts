import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

type PixWebhooksDeleteResponseType = Record<string, string>

export class PixWebhooksDeleteResponse extends ApiResponse {
  #props: PixWebhooksDeleteResponseType
  constructor(props: PixWebhooksDeleteResponseType) {
    super()
    this.#props = props
  }

  get props() {
    return this.#props
  }

  get status() {
    return 'webhook deleted!'
  }

  toObject() {
    return {
      status: this.status,
    }
  }
}
