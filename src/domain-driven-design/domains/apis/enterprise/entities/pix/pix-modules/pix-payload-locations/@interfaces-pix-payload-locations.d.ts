import { PixLocationProps, TipoCob } from '../../value-objects/pix-location'
import { PixFilterSearchProps } from '../@interfaces-common'

export interface PixPayloadLocationsCreateProps {
  body: {
    tipoCob: TipoCob
  }
}

export interface PixPayloadLocationsFindUniqueProps {
  /**
   *  ID do location a ser associada a cobrança. int32
   */
  id: number
}

export interface PixPayloadLocationsFindManyProps
  extends PixFilterSearchProps {}

export interface PixPayloadLocationsGenerateQrCodeProps {
  /**
   *  ID do location a ser associada a cobrança. int32
   */
  id: number
}

export interface PixPayloadLocationsDetachTxIdProps {
  /**
   *  ID do location a ser associada a cobrança. int32
   */
  id: number
}

export interface PixPayloadLocationsResponseType extends PixLocationProps {}

export interface PixPayloadLocationsGenerateQrCodeResponseType {
  /**
   * BRCode ou copia e cola
   */
  qrcode: string
  imagemQrcode: string
  linkVisualizacao: string
}
