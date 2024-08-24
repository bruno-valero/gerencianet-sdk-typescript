import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import { MonetaryValueToObjectProps } from '../../../value-objects/monetary-value'
import { Id } from '../../value-objects/id'
import { PixImediateChargeResponse } from '../pix-imediate-charge/pix-imediate-charge-response'
import { PixPaymentSplitFindUniqueImediateChargeAttachmentResponseType } from './@interfaces-pix-payment-split'

export class PixPaymentSplitImediateChargeAttachmentResponse extends ApiResponse {
  #props: {
    imediateChargeResponse: PixImediateChargeResponse
    config: {
      id: Id
      status: string
      descricao: string
    }
  }

  constructor({
    config,
    ...imediateChargeProps
  }: PixPaymentSplitFindUniqueImediateChargeAttachmentResponseType) {
    super()
    this.#props = {
      imediateChargeResponse: new PixImediateChargeResponse(
        imediateChargeProps,
      ),
      config: {
        id: new Id({ size: 35, value: config.id }),
        descricao: config.descricao,
        status: config.status,
      },
    }
  }

  get calendario() {
    return this.#props.imediateChargeResponse.calendario
  }

  get txid() {
    return this.#props.imediateChargeResponse.txid
  }

  get revisao() {
    return this.#props.imediateChargeResponse.revisao
  }

  get loc() {
    return this.#props.imediateChargeResponse.loc
  }

  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  get location() {
    return this.#props.imediateChargeResponse.location
  }

  get status() {
    return this.#props.imediateChargeResponse.status
  }

  get devedor() {
    return this.#props.imediateChargeResponse.devedor
  }

  get valor() {
    return this.#props.imediateChargeResponse.valor
  }

  get chave() {
    return this.#props.imediateChargeResponse.chave
  }

  get solicitacaoPagador() {
    return this.#props.imediateChargeResponse.solicitacaoPagador
  }

  get pixCopiaECola() {
    return this.#props.imediateChargeResponse.pixCopiaECola
  }

  get config() {
    return this.#props.config
  }

  toObject(props?: {
    valueFormat?: MonetaryValueToObjectProps['formatProps']
  }) {
    return {
      ...this.#props.imediateChargeResponse.toObject(props),
      config: {
        id: this.config.id.value,
        status: this.config.status,
        descricao: this.config.descricao,
      },
    }
  }
}
