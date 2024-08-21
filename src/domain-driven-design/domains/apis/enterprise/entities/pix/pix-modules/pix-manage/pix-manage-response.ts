import dayjs from 'dayjs'

import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import {
  MonetaryValue,
  MonetaryValueToObjectProps,
} from '../../../value-objects/monetary-value'
import { E2eId } from '../../value-objects/e2e-id'
import { TxId } from '../../value-objects/tx-id'
import { PixManageResponseType } from './@interfaces-pix-manage'
import { PixManageReturnResponse } from './pix-manage-return-response'

export class PixManageResponse extends ApiResponse {
  #props: {
    endToEndId: E2eId
    txid: TxId
    valor: MonetaryValue
    horario: Date
    infoPagador: string
    devolucoes?: PixManageReturnResponse[]
  }

  constructor(props: PixManageResponseType) {
    super()
    this.#props = {
      endToEndId: new E2eId(props.endToEndId),
      txid: new TxId(props.txid),
      valor: new MonetaryValue(props.valor),
      horario: new Date(props.horario),
      infoPagador: props.infoPagador,
      devolucoes: props.devolucoes?.map((item) => {
        return new PixManageReturnResponse(item)
      }),
    }
  }

  get endToEndId() {
    return this.#props.endToEndId
  }

  get txid() {
    return this.#props.txid
  }

  get valor() {
    return this.#props.valor
  }

  get horario() {
    return dayjs(this.#props.horario)
  }

  get infoPagador() {
    return this.#props.infoPagador
  }

  get devolucoes() {
    return this.#props.devolucoes
  }

  toObject(props?: {
    formatProps?: MonetaryValueToObjectProps['formatProps']
  }) {
    const formatProps = props?.formatProps
    return {
      endToEndId: this.endToEndId.value,
      txid: this.txid.value,
      valor: this.valor.toObject({ formatProps }),
      horario: this.horario.toDate(),
      infoPagador: this.infoPagador,
      devolucoes: this.devolucoes?.map((item) => {
        return item.toObject()
      }),
    }
  }
}
