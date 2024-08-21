import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'

import {
  PixManageConsultProps,
  PixWebhooksConsultManyProps,
  PixWebhooksConsultReturnProps,
  PixWebhooksReturnProps,
} from './@interfaces-pix-manage'
import { PixManageResponse } from './pix-manage-response'
import { PixManageReturnResponse } from './pix-manage-return-response'

/**
 * Gestão das transações Pix, isto é, a manutenção dos recebimentos e devoluções Pix.
 */
export class PixManage<type extends EnvironmentTypes> extends ApiRequest<
  type,
  'PIX'
> {
  /**
   *
   * ---
   *
   *  Consultar um Pix através de um `e2eId`.
   *
   * ---
   *
   * ### Atenção
   * Este endpoint retorna apenas informações sobre Pix recebidos.
   *
   * ---
   *
   * @param PixManageConsultProps
   * @returns `PixManageResponse | null`
   */
  async consult({ e2eId }: PixManageConsultProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailReceived({
      e2eId,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixManageResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Consultar vários Pix recebidos.
   *
   * ---
   *
   * @param PixWebhooksConsultManyProps
   * @returns `PixManageResponse | null`
   */
  async consultMany({ searchParams }: PixWebhooksConsultManyProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixReceivedList()

    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixManageResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Solicitar uma devolução usando o `e2eId` do Pix e o `ID da devolução`. O motivo atribuído à PACS.004 será “Devolução solicitada pelo usuário recebedor do pagamento original”, com a sigla “MD06”, conforme consta na aba RTReason da PACS.004 no Catálogo de Mensagens do Pix.
   *
   * ---
   *
   * ### Instruções
   * Você pode simular a rejeição da devolução usando o valor de **R$ 0,01**. Essas devoluções serão rejeitadas e notificadas para simular o fluxo de produção. Devoluções com valores diferentes de **R$ 0,01**, seguirão o fluxo normal de devolução com várias outras validações. Se estiverem em conformidade, serão confirmadas e notificadas, simulando o fluxo de produção.
   *
   * ---
   *
   * @param PixWebhooksReturnProps
   * @returns `PixManageReturnResponse | null`
   */
  async return({ e2eId, id, body }: PixWebhooksReturnProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDevolution({
      e2eId,
      id,
    })

    const resp = await this.sendRequest({
      method,
      route,
      body,
      ResponseClass: PixManageReturnResponse,
    })

    return resp
  }

  /**
   * ---
   *
   * Consultar uma devolução através de um `e2eId` do Pix e do `ID da devolução`.
   *
   * ---
   *
   * ### Instruções
   * É possível consultar informações de uma devolução simulada pelo endpoint de Envio de Devolução no ambiente de homologação.
   *
   * A funcionalidade ocorre exatamente como no ambiente de produção.
   *
   * ---
   *
   * @param PixWebhooksReturnProps
   * @returns `PixManageReturnResponse | null`
   */
  async consultReturn({ e2eId, id }: PixWebhooksConsultReturnProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailDevolution({
      e2eId,
      id,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixManageReturnResponse,
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
    const pix = new PixManage(type, 'PIX', {
      ...options,
      client_id: clientId,
      client_secret: clientSecret,
    })

    return pix
  }
}
