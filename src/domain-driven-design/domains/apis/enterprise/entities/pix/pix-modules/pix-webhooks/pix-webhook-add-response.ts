import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

type PixWebhooksAddResponseType = {
  webhookUrl: string
}

export class PixWebhooksAddResponse extends ApiResponse {
  #props: PixWebhooksAddResponseType
  constructor(props: PixWebhooksAddResponseType) {
    super()
    this.#props = props
  }

  /**
   * Url para onde a notificação vai ser enviada
   */
  get webhookUrl() {
    return this.#props.webhookUrl
  }

  toObject() {
    return {
      /**
       * Url para onde a notificação vai ser enviada
       */
      webhookUrl: this.webhookUrl,
    }
  }
}
