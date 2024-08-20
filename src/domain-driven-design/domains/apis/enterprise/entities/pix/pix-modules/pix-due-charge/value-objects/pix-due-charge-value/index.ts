import { MonetaryValueToObjectProps } from '@apisEnterprise/entities/value-objects/monetary-value'

import {
  PixDueChargeValueContract,
  PixDueChargeValueContractProps,
} from './@abstract-pix-due-charge-value-contract'
import { PixDueChargeValueDetails } from './pix-due-charge-details'

interface PixDueChargeValueProps extends PixDueChargeValueContractProps {}

export class PixDueChargeValue extends PixDueChargeValueContract {
  #details: PixDueChargeValueDetails
  constructor(props: PixDueChargeValueProps) {
    super(props)
    this.#details = new PixDueChargeValueDetails(props)
  }

  get details() {
    return this.#details
  }

  get value() {
    return this.props.original
  }

  toObject(props?: {
    formatProps?: MonetaryValueToObjectProps['formatProps']
  }) {
    const formatProps = props?.formatProps

    return {
      details: this.details.toObject({ formatProps }),
      value: this.value.format(formatProps),
    }
  }
}
