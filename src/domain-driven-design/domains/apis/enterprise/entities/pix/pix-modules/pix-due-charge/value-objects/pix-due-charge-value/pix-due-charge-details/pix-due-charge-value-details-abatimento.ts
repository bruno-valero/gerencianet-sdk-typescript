import {
  MonetaryValue,
  MonetaryValueToObjectProps,
} from '@apisEnterprise/entities/value-objects/monetary-value'

import { PixDueChargeValueContract } from '../@abstract-pix-due-charge-value-contract'

export class PixDueChargeValueDetailsAbatimento extends PixDueChargeValueContract {
  get data() {
    return this.props.abatimento
  }

  get details() {
    if (!this.props.abatimento) return undefined

    let value: number
    if (
      !this.props.abatimento.modalidade ||
      ![1, 2].includes(this.props.abatimento.modalidade)
    ) {
      value = 0
    }
    if (this.props.abatimento.modalidade === 1) {
      value = Number(this.props.abatimento.valorPerc)
    } else {
      value =
        (Number(this.props.abatimento.valorPerc) / 100) *
        this.props.original.units
    }

    type Modalidade = {
      type: 'Valor Fixo' | 'Valor Percentual'
    }

    const modalidadeType: Modalidade['type'] =
      this.props.abatimento.modalidade === 1 ? 'Valor Fixo' : 'Valor Percentual'

    return {
      value: new MonetaryValue(value),
      modalidade: {
        type: modalidadeType,
      },
    }
  }

  toObject(props?: {
    formatProps?: MonetaryValueToObjectProps['formatProps']
  }) {
    const formatProps = props?.formatProps

    return {
      data: this.data,
      details: {
        modalidade: this.details?.modalidade,
        value: this.details?.value.format(formatProps),
      },
    }
  }
}
