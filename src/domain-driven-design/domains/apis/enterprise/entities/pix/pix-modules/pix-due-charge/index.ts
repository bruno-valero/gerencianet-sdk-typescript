import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'

import {
  PixDueChargeCreateProps,
  PixDueChargeFindManyProps,
  PixDueChargeFindUniqueProps,
  PixDueChargeUpdateProps,
} from './@interfaces-pix-due-charge'
import { PixDueChargeResponse } from './pix-due-charge-response'
import { PixDueChargeResponseArray } from './pix-due-charge-response-array'

export class PixDueCharge<type extends EnvironmentTypes> extends ApiRequest<
  type,
  'PIX'
> {
  /**
   * Cadastrar uma cobrança com vencimento e um identificador de transação (`txid`).
   *
   * @param PixDueChargeCreateProps
   * @returns `PixDueChargeResponse | null`
   */
  async create({ body, txid }: PixDueChargeCreateProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixCreateDueCharge({
      txid,
    })

    const resp = await this.sendRequest({
      method,
      route,
      body,
      ResponseClass: PixDueChargeResponse,
    })

    return resp
  }

  /**
   * Revisar (modificar) uma cobrança a partir do seu `txid`.
   *
   * @param PixDueChargeUpdateProps
   * @returns `PixDueChargeResponse | null`
   */
  async update({ body, txid }: PixDueChargeUpdateProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixUpdateDueCharge({
      txid,
    })

    const resp = await this.sendRequest({
      method,
      route,
      body,
      ResponseClass: PixDueChargeResponse,
    })

    return resp
  }

  /**
   * Consultar uma cobrança com vencimento a partir do `txid`.
   *
   * @param PixDueChargeFindUniqueProps
   * @returns `PixDueChargeResponse | null`
   */
  async findUnique({ searchParams, txid }: PixDueChargeFindUniqueProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailDueCharge({
      txid,
    })

    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixDueChargeResponse,
    })

    return resp
  }

  /**
   * Consultar cobranças com vencimento através de parâmetros como início, fim, cpf, cnpj e status.
   *
   * @param PixDueChargeFindManyProps
   * @returns `PixDueChargeResponseArray | null`
   */
  async findMany({ searchParams }: PixDueChargeFindManyProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixListDueCharges()

    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixDueChargeResponseArray,
    })

    return resp
  }
}
