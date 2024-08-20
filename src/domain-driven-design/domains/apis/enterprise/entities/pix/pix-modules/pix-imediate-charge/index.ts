import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'
import { PixImediateChargeResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-imediate-charge/pix-imediate-charge-response'

import {
  PixImediateChargeCreateProps,
  PixImediateChargeFindManyProps,
  PixImediateChargeFindUniqueProps,
  PixImediateChargeUpdateProps,
} from './@interfaces-pix-imediate-charge'
import { PixImediateChargeResponseArray } from './pix-imediate-charge-response-array'

/**
 * Responsável pela gestão de cobranças imediatas. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
 */
export class PixImediateCharge<
  type extends EnvironmentTypes,
> extends ApiRequest<type, 'PIX'> {
  /**
   * O txid é criado pelo usuário recebedor e está sob sua responsabilidade. No entanto, caso deseje que o txid será definido pela Efí, basta omitir est informação.
   *
   * @param props ```ts
   * interface PixImediateChargeCreateProps
   * ```
   * @returns ```ts
   * Promise<(interface PixImediateChargeResponse) | null>
   * ```
   */
  async create({ txid, body }: PixImediateChargeCreateProps) {
    const { method, route } = txid
      ? this.endpoints.ENDPOINTS.pixCreateCharge({
          txid,
        })
      : this.endpoints.ENDPOINTS.pixCreateImmediateCharge()

    const resp = await this.sendRequest({
      body,
      method,
      route,
      ResponseClass: PixImediateChargeResponse,
    })

    return resp
  }

  /**
   * Endpoint para revisar (modificar) uma cobrança a partir do seu `txid`.
   * @param PixImediateChargeUpdateProps
   * @returns `PixImediateChargeResponse | null`
   */
  async update({ txid, body }: PixImediateChargeUpdateProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixUpdateCharge({
      txid,
    })

    const resp = await this.sendRequest({
      body,
      method,
      route,
      ResponseClass: PixImediateChargeResponse,
    })

    return resp
  }

  /**
   * Endpoint para consultar uma cobrança a partir do `txid`.
   * @param PixImediateChargeFindUniqueProps
   * @returns `PixImediateChargeResponseType | null`
   */
  async findUnique({ txid, searchParams }: PixImediateChargeFindUniqueProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailCharge({
      txid,
    })

    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixImediateChargeResponse,
    })

    return resp
  }

  /**
   * Endpoint para consultar várias cobranças.
   *
   * Este endpoint possui filtros para afunilar os resultados da busca, tais como CPF/CNPJ e status. Dentre todos os filtros disponíveis, os filtros inicio e fim são obrigatórios e representam o intervalo de datas em que as cobranças consultadas devem estar compreendidas.
   *
   * @param PixImediateChargeResponseArray
   * @returns
   */
  async findMany({ searchParams }: PixImediateChargeFindManyProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixListCharges()

    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixImediateChargeResponseArray,
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
    const pix = new PixImediateCharge(type, 'PIX', {
      ...options,
      client_id: clientId,
      client_secret: clientSecret,
    })

    return pix
  }
}
