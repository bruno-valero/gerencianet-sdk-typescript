import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'

import {
  PixPaymentSplitAttachDueChargeProps,
  PixPaymentSplitAttachImediateChargeProps,
  PixPaymentSplitCreateProps,
  PixPaymentSplitDeleteImediateChargeAttachmentProps,
  PixPaymentSplitFindUniqueDueChargeAttachmentProps,
  PixPaymentSplitFindUniqueImediateChargeAttachmentProps,
  PixPaymentSplitFindUniqueProps,
} from './@interfaces-pix-payment-split'
import { PixPaymentSplitAttachmentResponse } from './pix-payment-split-attachment-response'
import { PixPaymentSplitDueChargeAttachmentResponse } from './pix-payment-split-due-charge-attachment-response'
import { PixPaymentSplitImediateChargeAttachmentResponse } from './pix-payment-split-imediate-charge-attachment-response'
import { PixPaymentSplitResponse } from './pix-payment-split-response'

/**
 *
 * ---
 *
 * Realização do Split de pagamento na API Pix Efí. Responsável pela configuração dos Splits de pagamento na API Pix. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
 *
 * ---
 *
 * ### Importante!
 *
 * O **Split de pagamento Pix** só pode ser realizado entre contas Efí, com limite máximo de 20 contas para o repasse.
 *
 * ---
 *
 * ### Informação
 *
 * Uma mesma configuração de Split pode ser utilizada em várias cobranças. Isso significa que você pode definir uma divisão de valores para um parceiro e aplicá-la em todas as cobranças relacionadas.
 *
 * ---
 *
 * ### Configure Split de Pagamento em QR Code e copia e cola estático!
 *
 * Você tem a flexibilidade de dividir o pagamento dos QR Codes e copia e cola estático entre diferentes contas Efí. Isso significa que, ao gerar um QR Code ou um código copia e cola estáticos para pagamento, você pode especificar como o valor recebido será distribuído, facilitando a gestão financeira e assegurando que os fundos sejam alocados corretamente desde o início.
 *
 * ---
 *
 * ### Instruções para testes em Homologação
 *
 * No processo de split de pagamento, é essencial fornecer uma conta digital EFÍ válida.
 *
 * É importante destacar que não é possível realizar o split para a própria conta. Portanto, se estiver realizando testes em ambiente de homologação e não possuir uma conta válida para os repasses, será necessário criar uma subconta. Veja como fazer isso [aqui](https://sejaefi.com.br/central-de-ajuda/efi-bank/ter-mais-de-uma-conta-efi#conteudo).
 *
 * ---
 *
 */
export class PixPaymentSplit<type extends EnvironmentTypes> extends ApiRequest<
  type,
  'PIX'
> {
  /**
   *
   * ---
   *
   * Cadastrar uma cobrança com um identificador de transação (`id`). O id é criado pela pessoa usuária recebedora e está sob sua responsabilidade. Caso o usuário informe um id que já exista, esse endpoint irá atualizar a configuração da cobrança.
   *
   * ---
   *
   * ### Caso `id` não seja informado
   *
   * Em geral, o `id` é criado pela pessoa recebedora e está sob sua responsabilidade. Porém, neste caso, o id será definido pela Efí, fazendo uma exceção à regra padrão.
   *
   * ---
   *
   * @param PixPaymentSplitCreateProps
   * @returns `PixPaymentSplitResponse | null`
   *
   */
  async create({ body, id }: PixPaymentSplitCreateProps) {
    const { method, route } = id
      ? this.endpoints.ENDPOINTS.pixSplitConfigId({ id })
      : this.endpoints.ENDPOINTS.pixSplitConfig()

    const resp = await this.sendRequest({
      method,
      route,
      body,
      ResponseClass: PixPaymentSplitResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Consultar um Split de pagamento partir do id.
   *
   * ---
   *
   * @param PixPaymentSplitFindUniqueProps
   * @returns `PixPaymentSplitResponse | null`
   */
  async findUnique({ id, searchParams }: PixPaymentSplitFindUniqueProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixSplitDetailConfig({
      id,
    })

    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixPaymentSplitResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Vincula uma cobrança Pix a um Split de pagamento. Ele utiliza dois campos (`txid` da cobrança e splitConfigId do Split de pagamento) para fazer essa vinculação quando a cobrança Pix está ativa.
   *
   * ---
   *
   */
  async attachImediateCharge({
    txid,
    splitConfigId,
  }: PixPaymentSplitAttachImediateChargeProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixSplitLinkCharge({
      txid,
      splitConfigId,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixPaymentSplitAttachmentResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Consultar uma cobrança com Split de pagamento a partir do `txid`.
   *
   * ---
   *
   * @param PixPaymentSplitFindUniqueImediateChargeAttachmentProps
   * @returns `PixPaymentSplitImediateChargeAttachmentResponse | null`
   */
  async findUniqueImediateChargeAttachment({
    txid,
  }: PixPaymentSplitFindUniqueImediateChargeAttachmentProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixSplitDetailCharge({
      txid,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixPaymentSplitImediateChargeAttachmentResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Deletar o vinculo entre um split de pagamento e uma cobrança a partir do `txid`.
   *
   * ---
   *
   * @param PixPaymentSplitDeleteImediateChargeAttachmentProps
   * @returns `PixPaymentSplitAttachmentResponse | null`
   */
  async deleteImediateChargeAttachment({
    txid,
  }: PixPaymentSplitDeleteImediateChargeAttachmentProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixSplitUnlinkCharge({
      txid,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixPaymentSplitAttachmentResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Vincula uma cobrança com vencimento (COBV) a um Split de pagamento.
   *
   * ---
   *
   */
  async attachDueCharge({
    txid,
    splitConfigId,
  }: PixPaymentSplitAttachDueChargeProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixSplitLinkDueCharge({
      txid,
      splitConfigId,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixPaymentSplitAttachmentResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Consultar  uma cobrança com vencimento e com a partir do `txid`.
   *
   * ---
   *
   * @param PixPaymentSplitFindUniqueImediateChargeAttachmentProps
   * @returns `PixPaymentSplitImediateChargeAttachmentResponse | null`
   */
  async findUniqueDueChargeAttachment({
    txid,
  }: PixPaymentSplitFindUniqueDueChargeAttachmentProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixSplitDetailDueCharge({
      txid,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixPaymentSplitDueChargeAttachmentResponse,
    })

    return resp
  }

  /**
   *
   * ---
   *
   * Deletar o vinculo entre um split de pagamento e uma cobrança com vencimento a partir do `txid`.
   *
   * ---
   *
   * @param PixPaymentSplitDeleteImediateChargeAttachmentProps
   * @returns `PixPaymentSplitAttachmentResponse | null`
   */
  async deleteDueChargeAttachment({
    txid,
  }: PixPaymentSplitDeleteImediateChargeAttachmentProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixSplitUnlinkDueCharge({
      txid,
    })

    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixPaymentSplitAttachmentResponse,
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
    const pix = new PixPaymentSplit(type, 'PIX', {
      ...options,
      client_id: clientId,
      client_secret: clientSecret,
    })

    return pix
  }
}
