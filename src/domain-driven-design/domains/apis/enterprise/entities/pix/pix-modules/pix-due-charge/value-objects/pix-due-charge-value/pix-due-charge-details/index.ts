import { MonetaryValueToObjectProps } from '@apisEnterprise/entities/value-objects/monetary-value'

import {
  PixDueChargeValueContract,
  type PixDueChargeValueContractProps,
} from '../@abstract-pix-due-charge-value-contract'
import { PixDueChargeValueDetailsAbatimento } from './pix-due-charge-value-details-abatimento'
import { PixDueChargeValueDetailsDesconto } from './pix-due-charge-value-details-desconto'
import { PixDueChargeValueDetailsJuros } from './pix-due-charge-value-details-juros'
import { PixDueChargeValueDetailsMulta } from './pix-due-charge-value-details-multa'

export class PixDueChargeValueDetails extends PixDueChargeValueContract {
  #multa: PixDueChargeValueDetailsMulta
  #juros: PixDueChargeValueDetailsJuros
  #abatimento: PixDueChargeValueDetailsAbatimento
  #desconto: PixDueChargeValueDetailsDesconto

  constructor(props: PixDueChargeValueContractProps) {
    super(props)
    this.#multa = new PixDueChargeValueDetailsMulta(props)
    this.#juros = new PixDueChargeValueDetailsJuros(props)
    this.#abatimento = new PixDueChargeValueDetailsAbatimento(props)
    this.#desconto = new PixDueChargeValueDetailsDesconto(props)
  }

  get multa() {
    return this.#multa
  }

  get juros() {
    return this.#juros
  }

  get abatimento() {
    return this.#abatimento
  }

  get desconto() {
    return this.#desconto
  }

  toObject(props?: {
    formatProps?: MonetaryValueToObjectProps['formatProps']
  }) {
    const formatProps = props?.formatProps

    return {
      multa: this.multa.toObject({ formatProps }),
      juros: this.juros.toObject({ formatProps }),
      abatimento: this.abatimento.toObject({ formatProps }),
      desconto: this.desconto.toObject({ formatProps }),
    }
  }
}
