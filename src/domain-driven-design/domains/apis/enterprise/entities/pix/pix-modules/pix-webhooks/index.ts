import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'

import {
  PixWebhooksAddProps,
  PixWebhooksDeleteProps,
  PixWebhooksFindManyProps,
  PixWebhooksFindUniqueProps,
} from './@interfaces-pix-webhooks'
import { PixWebhooksAddResponse } from './pix-webhook-add-response'
import { PixWebhooksDeleteResponse } from './pix-webhook-delete-response'
import { PixWebhooksResponse } from './pix-webhook-response'
import { PixWebhooksResponseArray } from './pix-webhook-response-array'

/**
 * gerenciamento de notificações por parte do PSP recebedor a pessoa usuária recebedora.
 */
export class PixWebhooks<type extends EnvironmentTypes> extends ApiRequest<
  type,
  'PIX'
> {
  /**
   * Configuração do serviço de notificações acerca de Pix recebidos. Pix oriundos de cobranças estáticas só serão notificados se estiverem associados a um txid.
   *
   * ---
   *
   * - ### Lembrete
   * Uma URL de webhook pode estar associada a várias chaves Pix. **Por outro lado, uma chave Pix só pode estar vinculada a uma única URL de webhook**.
   *
   * ---
   *
   * - ### Informação
   * Ao cadastrar seu webhook, enviaremos uma notificação de teste para a URL cadastrada, porém quando de fato uma notificação for enviada, o caminho `/pix` será acrescentado ao final da URL cadastrada. Para não precisar de duas rotas distintas, você poder adicionar um parâmetro `?ignorar=` ao final da URL cadastrada, para que o `/pix` não seja acrescentado na rota da sua URL.
   *
   */
  async add({ body, chave }: PixWebhooksAddProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixConfigWebhook({
      chave,
    })

    const resp = await this.sendRequest({
      body,
      method,
      route,
      ResponseClass: PixWebhooksAddResponse,
    })

    return resp
  }

  async findUnique({ chave }: PixWebhooksFindUniqueProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailWebhook({
      chave,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixWebhooksResponse,
    })

    return resp
  }

  async findMany({ searchParams }: PixWebhooksFindManyProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixListWebhook()

    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixWebhooksResponseArray,
    })

    return resp
  }

  async delete({ chave }: PixWebhooksDeleteProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDeleteWebhook({
      chave,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixWebhooksDeleteResponse,
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
    const pix = new PixWebhooks(type, 'PIX', {
      ...options,
      client_id: clientId,
      client_secret: clientSecret,
    })

    return pix
  }
}
