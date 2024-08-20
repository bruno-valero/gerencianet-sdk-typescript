import {
  MonetaryValue,
  MonetaryValueToObjectProps,
} from '@apisEnterprise/entities/value-objects/monetary-value'

import { PixDueChargeValueContract } from '../@abstract-pix-due-charge-value-contract'

export class PixDueChargeValueDetailsJuros extends PixDueChargeValueContract {
  get data() {
    return this.props.juros
  }

  get details() {
    let value: number
    if (
      !this.props.juros.modalidade ||
      ![1, 2, 3, 4, 5, 6, 7, 8].includes(this.props.juros.modalidade)
    ) {
      value = 0
    }

    type Modalidade = {
      type: 'dias corridos' | 'dias úteis'
      interest: 'Percentual' | 'Valor'
      periodicity: 'dia' | 'mês' | 'ano'
      format: `${string} ao ${'dia' | 'mês' | 'ano'} (${'dias corridos' | 'dias úteis'})`
    }

    const type: Modalidade['type'] = [1, 2, 3, 4].includes(
      this.props.juros.modalidade,
    )
      ? 'dias corridos'
      : 'dias úteis'

    const interest: Modalidade['interest'] = [1, 5].includes(
      this.props.juros.modalidade,
    )
      ? 'Valor'
      : 'Percentual'

    const periodicity: Modalidade['periodicity'] = [1, 2, 5, 6].includes(
      this.props.juros.modalidade,
    )
      ? 'dia'
      : [3, 7].includes(this.props.juros.modalidade)
        ? 'mês'
        : 'ano'

    const valuePerc =
      interest === 'Percentual'
        ? `${this.props.juros.valorPerc}%`
        : new MonetaryValue(this.props.juros.valorPerc).format({
            locale: 'pt-BR',
            currency: 'BRL',
          })

    const format: Modalidade['format'] = `${valuePerc} ao ${periodicity} (${type})`

    if (interest === 'Percentual') {
      value =
        this.props.original.units * (Number(this.props.juros.valorPerc) / 100)
    } else {
      value = Number(this.props.juros.valorPerc)
    }

    return {
      value: new MonetaryValue(value),
      modalidade: {
        type,
        interest,
        periodicity,
        format,
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
        modalidade: this.details.modalidade,
        value: this.details.value.format(formatProps),
      },
    }
  }
}
