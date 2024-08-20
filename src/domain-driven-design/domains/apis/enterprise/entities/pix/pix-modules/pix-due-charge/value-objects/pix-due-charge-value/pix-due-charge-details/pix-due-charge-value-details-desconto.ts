import {
  MonetaryValue,
  MonetaryValueToObjectProps,
} from '@apisEnterprise/entities/value-objects/monetary-value'

import { PixDueChargeValueContract } from '../@abstract-pix-due-charge-value-contract'

export class PixDueChargeValueDetailsDesconto extends PixDueChargeValueContract {
  get data() {
    return this.props.abatimento
  }

  get details() {
    type ModalidadeType =
      | 'por antecipação dias corridos'
      | 'por antecipação dias úteis'
      | 'fixo'
    type ModalidadeInterest = 'Percentual' | 'Valor'

    const modalidadeType: ModalidadeType = [1, 2].includes(
      this.props.desconto.modalidade,
    )
      ? 'fixo'
      : [3, 5].includes(this.props.desconto.modalidade)
        ? 'por antecipação dias corridos'
        : 'por antecipação dias úteis'

    const modalidadeInterest: ModalidadeInterest = [1, 3, 4].includes(
      this.props.desconto.modalidade,
    )
      ? 'Valor'
      : 'Percentual'

    const details = {
      modalidade: {
        type: modalidadeType,
        interest: modalidadeInterest,
      },
      descontoDataFixa: this.props.desconto.descontoDataFixa.map((item) => {
        return {
          data: item.data,
          value: new MonetaryValue(
            modalidadeInterest === 'Valor'
              ? Number(item.valorPerc)
              : this.props.original.units * (Number(item.valorPerc) / 100),
          ),
        }
      }),
    }

    return details
  }

  toObject(props?: {
    formatProps?: MonetaryValueToObjectProps['formatProps']
  }) {
    const formatProps = props?.formatProps

    return {
      data: this.data,
      details: {
        modalidade: this.details.modalidade,
        value: this.details.descontoDataFixa.map(({ data, value }) => {
          return { data, value: value.format(formatProps) }
        }),
      },
    }
  }
}
