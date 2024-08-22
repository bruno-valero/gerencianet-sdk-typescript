import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'

import {
  PixPayloadLocationsCreateProps,
  PixPayloadLocationsDetachTxIdProps,
  PixPayloadLocationsFindManyProps,
  PixPayloadLocationsFindUniqueProps,
  PixPayloadLocationsGenerateQrCodeProps,
} from './@interfaces-pix-payload-locations'
import { PixPayloadLocationsQRCodeResponse } from './pix-payload-locations-qr-code-response'
import { PixPayloadLocationsResponse } from './pix-payload-locations-response'
import { PixPayloadLocationsResponseArray } from './pix-payload-locations-response-array'

/**
 * Destinado a lidar com configuração e remoção de locations para uso dos payloads.
 */
export class PixPayloadLocations<
  type extends EnvironmentTypes,
> extends ApiRequest<type, 'PIX'> {
  /**
   *
   * ---
   *
   * Criar location do payload. Necessário enviar no body da requisição o atributo tipoCob com o valor COB ou COBV.
   *
   * ---
   *
   * @param PixPayloadLocationsCreateProps
   * @returns `PixLocation<"cob" | "cobv" | undefined> | null`
   */
  async create({ body }: PixPayloadLocationsCreateProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixCreateLocation()

    const resp = await this.sendRequest({
      method,
      route,
      body,
      ResponseClass: PixPayloadLocationsResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Recuperar a location do payload
   *
   * ---
   *
   */
  async findUnique({ id }: PixPayloadLocationsFindUniqueProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailLocation({ id })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixPayloadLocationsResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Consultar locations cadastradas.
   *
   * ---
   *
   */
  async findMany({ searchParams }: PixPayloadLocationsFindManyProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixLocationList()

    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixPayloadLocationsResponseArray,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Gerar QR Code de um location.
   *
   * ---
   *
   */
  async generateQrCode({ id }: PixPayloadLocationsGenerateQrCodeProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixGenerateQRCode({ id })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixPayloadLocationsQRCodeResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Desvincular uma cobrança de um location.
   *
   * ---
   *
   * Se executado com sucesso, a entidade `loc` não apresentará mais um **txid**, como acontecia antes da chamada. Além disso, a entidade `cob` ou `cobv` associada ao txid desvinculado também não apresentará mais um location. Essa operação não altera o `status` da `cob` ou `cobv` em questão.
   *
   * ---
   *
   */
  async detachTxId({ id }: PixPayloadLocationsDetachTxIdProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixUnlinkTxidLocation({
      id,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixPayloadLocationsResponse,
    })

    return resp
  }

  // eslint-disable-next-line
  // @ts-ignore
  useCredentials({
    clientId,
    clientSecret,
  }: {
    clientId: string
    clientSecret: string
  }) {
    const type = this.type
    const options = this.options
    const pix = new PixPayloadLocations(type, 'PIX', {
      ...options,
      client_id: clientId,
      client_secret: clientSecret,
    })

    return pix
  }
}
