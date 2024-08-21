import dayjs from 'dayjs'

import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import { PixWebhooksResponseType } from './@interfaces-pix-webhooks'

export class PixWebhooksResponse extends ApiResponse {
  #props: PixWebhooksResponseType
  constructor(props: PixWebhooksResponseType) {
    super()
    this.#props = props
  }

  /**
   * Url para onde a notificação vai ser enviada
   */
  get webhookUrl() {
    return this.#props.webhookUrl
  }

  /**
   * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
   *
   * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
   *
   * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
   *
   * - string (Chave DICT do recebedor) `≤ 77 characters`
   */
  get chave() {
    return this.#props.chave
  }

  /**
   * Horário em que o webhook foi criado.
   *
   * @return instância do `dayjs`
   */
  get criacao() {
    return dayjs(this.#props.criacao)
  }

  toObject() {
    return {
      /**
       * Url para onde a notificação vai ser enviada
       */
      webhookUrl: this.webhookUrl,
      /**
       * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
       *
       * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
       *
       * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
       *
       * - string (Chave DICT do recebedor) `≤ 77 characters`
       */
      chave: this.chave,
      /**
       * Horário em que o webhook foi criado.
       *
       * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
       */
      criacao: this.criacao.toDate(),
    }
  }
}
