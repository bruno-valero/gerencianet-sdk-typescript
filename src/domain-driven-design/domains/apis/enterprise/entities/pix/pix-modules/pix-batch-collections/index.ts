import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'

import {
  PixBatchCollectionsCreateOrUpdateDueChargeBatchProps,
  PixBatchCollectionsFindManyDueChargeBatchProps,
  PixBatchCollectionsFindUniqueDueChargeBatchProps,
  PixBatchCollectionsUpdateDueChargeBatchProps,
} from './@interfaces-pix-batch-collections'
import { PixBatchCollectionsCreateOrUpdateDueChargeResponse } from './pix-batch-collections-create-or-update-due-charge-response'
import { PixBatchCollectionsResponse } from './pix-batch-collections-response'
import { PixBatchCollectionsResponseArray } from './pix-batch-collections-response-array'

/**
 * Responsável pela gestão de cobranças em lote. As cobranças, no contexto da API Pix, representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
 */
export class PixBatchCollections<
  type extends EnvironmentTypes,
> extends ApiRequest<type, 'PIX'> {
  /**
   *
   * ---
   *
   * Criar ou alterar um lote de cobranças com vencimento.
   *
   * ---
   *
   * ### Informação
   *
   * Uma solicitação de criação de cobrança com status "EM_PROCESSAMENTO" ou "NEGADA" está associada a uma cobrança não existe de fato, portanto não será listada em `GET /cobv` ou `GET /cobv/:txid`.
   *
   * Uma cobrança, uma vez criada via `PUT /cobv/:txid`, não pode ser associada a um lote posteriormente.
   *
   * Uma cobrança, uma vez criada via PUT `/lotecobv/:id`, não pode ser associada a um novo lote posteriormente.
   *
   * A criação do lote deve conter pelo menos **1** cobrança e no máximo **1000**.
   *
   * ---
   *
   * ### Dica
   *
   * Após a geração da cobrança em lote, você pode utilizar o endpoint de [Consultar lista de cobranças com vencimento](https://dev.efipay.com.br/docs/api-pix/cobrancas-com-vencimento#consultar-lista-de-cobran%C3%A7as-com-vencimento), informado o parâmetro `loteCobvId` para retornar as informações do lote.
   *
   * ---
   *
   * @param PixBatchCollectionsCreateOrUpdateDueChargeBatchProps
   * @returns `PixBatchCollectionsCreateOrUpdateDueChargeResponse | null`
   */
  async createOrUpdateDueChargeBatch({
    body,
    id,
  }: PixBatchCollectionsCreateOrUpdateDueChargeBatchProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixCreateDueChargeBatch({
      id,
    })

    const resp = await this.sendRequest({
      method,
      route,
      body,
      ResponseClass: PixBatchCollectionsCreateOrUpdateDueChargeResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Revisar cobranças específicas dentro de um lote de cobranças com vencimento.
   *
   * ---
   *
   * ### Informação
   *
   * A diferença deste endpoint para o endpoint PUT (**`createOrUpdateDueChargeBatch`**) correlato é que este endpoint admite um array cobsv com menos solicitações de criação ou alteração de cobranças do que o array atribuído na requisição originária do lote.
   *
   * Não se pode, entretanto, utilizar esse endpoint para agregar ou remover solicitações de alteração ou criação de cobranças conforme constam na requisição originária do lote.
   *
   * ---
   *
   * @param PixBatchCollectionsUpdateDueChargeBatchProps
   * @returns `PixBatchCollectionsCreateOrUpdateDueChargeResponse | null`
   */
  async updateDueChargeBatch({
    body,
    id,
  }: PixBatchCollectionsUpdateDueChargeBatchProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixUpdateDueChargeBatch({
      id,
    })

    const resp = await this.sendRequest({
      method,
      route,
      body,
      ResponseClass: PixBatchCollectionsCreateOrUpdateDueChargeResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Consultar um lote específico de cobranças com vencimento.
   *
   * ---
   *
   * @param PixBatchCollectionsFindUniqueDueChargeBatchProps
   * @returns `PixBatchCollectionsResponse | null`
   */
  async findUniqueDueChargeBatch({
    id,
  }: PixBatchCollectionsFindUniqueDueChargeBatchProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailDueChargeBatch({
      id,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixBatchCollectionsResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Consultar cobranças com vencimento através de parâmetros como início, fim, cpf, cnpj e status.
   *
   * ---
   *
   * @param PixBatchCollectionsFindManyDueChargeBatchProps
   * @returns `PixBatchCollectionsResponseArray | null`
   */
  async findManyDueChargeBatch({
    searchParams,
  }: PixBatchCollectionsFindManyDueChargeBatchProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixListDueChargeBatch()

    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixBatchCollectionsResponseArray,
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
    const pix = new PixBatchCollections(type, 'PIX', {
      ...options,
      client_id: clientId,
      client_secret: clientSecret,
    })

    return pix
  }
}
