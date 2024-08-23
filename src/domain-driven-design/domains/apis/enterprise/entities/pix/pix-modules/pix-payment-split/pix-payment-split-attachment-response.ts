import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

export class PixPaymentSplitAttachmentResponse extends ApiResponse {
  #props: {
    success: boolean
  }

  constructor(props: '' | undefined) {
    super()
    console.log('PixPaymentSplitAttachmentResponse constructor props:', props)
    this.#props = {
      success: props === '',
    }
  }

  get success() {
    return this.#props.success
  }

  toObject() {
    return {
      success: this.success,
    }
  }
}
