import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import { MonetaryValueToObjectProps } from '../../../value-objects/monetary-value'
import { Id } from '../../value-objects/id'
import { PixDueChargeResponse } from '../pix-due-charge/pix-due-charge-response'
import { PixPaymentSplitFindUniqueDueChargeAttachmentResponseType } from './@interfaces-pix-payment-split'

export class PixPaymentSplitDueChargeAttachmentResponse extends ApiResponse {
  #props: {
    dueChargeResponse: PixDueChargeResponse
    config: {
      id: Id
      status: string
      descricao: string
    }
  }

  constructor({
    config,
    ...dueChargeProps
  }: PixPaymentSplitFindUniqueDueChargeAttachmentResponseType) {
    super()
    this.#props = {
      dueChargeResponse: new PixDueChargeResponse(dueChargeProps),
      config: {
        id: new Id({ size: 35, value: config.id }),
        descricao: config.descricao,
        status: config.status,
      },
    }
  }

  get calendario() {
    return this.#props.dueChargeResponse.calendario
  }

  get txid() {
    return this.#props.dueChargeResponse.txid
  }

  get revisao() {
    return this.#props.dueChargeResponse.revisao
  }

  get loc() {
    return this.#props.dueChargeResponse.loc
  }

  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  get location() {
    return this.#props.dueChargeResponse.location
  }

  get status() {
    return this.#props.dueChargeResponse.status
  }

  get devedor() {
    return this.#props.dueChargeResponse.devedor
  }

  get valor() {
    return this.#props.dueChargeResponse.valor
  }

  get chave() {
    return this.#props.dueChargeResponse.chave
  }

  get solicitacaoPagador() {
    return this.#props.dueChargeResponse.solicitacaoPagador
  }

  get pixCopiaECola() {
    return this.#props.dueChargeResponse.pixCopiaECola
  }

  get config() {
    return this.#props.config
  }

  toObject(props?: {
    valueFormat?: MonetaryValueToObjectProps['formatProps']
  }) {
    return {
      ...this.#props.dueChargeResponse.toObject(props),
      config: {
        id: this.config.id.value,
        status: this.config.status,
        descricao: this.config.descricao,
      },
    }
  }
}
