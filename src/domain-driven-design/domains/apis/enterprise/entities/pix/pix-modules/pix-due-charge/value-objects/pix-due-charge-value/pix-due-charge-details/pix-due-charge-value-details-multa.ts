import {
  MonetaryValue,
  MonetaryValueToObjectProps,
} from '@apisEnterprise/entities/value-objects/monetary-value'

import { PixDueChargeValueContract } from '../@abstract-pix-due-charge-value-contract'

export class PixDueChargeValueDetailsMulta extends PixDueChargeValueContract {
  get data() {
    return this.props.multa
  }

  get details() {
    let value: number
    if (
      !this.props.multa.modalidade ||
      ![1, 2].includes(this.props.multa.modalidade)
    ) {
      value = 0
    }
    if (this.props.multa.modalidade === 1) {
      value = Number(this.props.multa.valorPerc)
    } else {
      value =
        (Number(this.props.multa.valorPerc) / 100) * this.props.original.units
    }

    return new MonetaryValue(value)
  }

  toObject(props?: {
    formatProps?: MonetaryValueToObjectProps['formatProps']
  }) {
    const formatProps = props?.formatProps

    return {
      data: this.data,
      details: this.details.toObject({ formatProps }),
    }
  }
}
