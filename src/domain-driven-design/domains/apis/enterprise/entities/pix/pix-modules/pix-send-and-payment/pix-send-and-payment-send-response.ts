import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import { PixSendAndPaymentSendResponseType } from './@interfaces-pix-send-and-payment'

export class PixSendAndPaymentSendResponse extends ApiResponse {
  #props: PixSendAndPaymentSendResponseType

  constructor(props: PixSendAndPaymentSendResponseType) {
    super()
    this.#props = props
  }

  get props() {
    return this.#props
  }

  toObject(...props: unknown[]): unknown {
    return props
  }
}
