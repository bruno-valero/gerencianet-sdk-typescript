import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import { PixPayloadLocationsGenerateQrCodeResponseType } from './@interfaces-pix-payload-locations'

export class PixPayloadLocationsQRCodeResponse extends ApiResponse {
  #props: {
    qrcode: string
    imagemQrcode: string
    linkVisualizacao: string
  }

  constructor(props: PixPayloadLocationsGenerateQrCodeResponseType) {
    super()
    this.#props = {
      qrcode: props.qrcode,
      imagemQrcode: props.imagemQrcode,
      linkVisualizacao: props.linkVisualizacao,
    }
  }

  /**
   * BRCode ou copia e cola
   */
  get qrcode() {
    return this.#props.qrcode
  }

  get imagemQrcode() {
    return this.#props.imagemQrcode
  }

  get linkVisualizacao() {
    return this.#props.linkVisualizacao
  }

  toObject() {
    return {
      qrcode: this.qrcode,
      imagemQrcode: this.imagemQrcode,
      linkVisualizacao: this.linkVisualizacao,
    }
  }
}
