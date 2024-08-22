import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

export class PixBatchCollectionsCreateOrUpdateDueChargeResponse extends ApiResponse {
  #success: boolean
  constructor(props: '') {
    super()
    this.#success = props === ''
  }

  get success() {
    return this.#success
  }

  toObject() {
    return this.success
  }
}
