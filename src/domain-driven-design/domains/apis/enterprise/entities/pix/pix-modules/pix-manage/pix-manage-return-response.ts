import dayjs from 'dayjs'

import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import {
  MonetaryValue,
  MonetaryValueToObjectProps,
} from '../../../value-objects/monetary-value'
import { PixStatus } from '../@types-common'
import { PixManageReturnResponseType } from './@interfaces-pix-manage'

export class PixManageReturnResponse extends ApiResponse {
  #props: {
    id: string
    rtrId: string
    valor: MonetaryValue
    horario: {
      solicitacao: Date
    }
    status: PixStatus
  }

  constructor(props: PixManageReturnResponseType) {
    super()

    this.#props = {
      id: props.id,
      rtrId: props.rtrId,
      valor: new MonetaryValue(props.valor),
      horario: {
        solicitacao: new Date(props.horario.solicitacao),
      },
      status: props.status,
    }
  }

  get id() {
    return this.#props.id
  }

  get rtrId() {
    return this.#props.rtrId
  }

  /**
   * Valor da devolução
   *
   * string `\d{1,10}\.\d{2}`
   */
  get valor() {
    return this.#props.valor
  }

  /**
   * Contém o horário em que a devolução foi feita.
   *
   */
  get horario() {
    return {
      /**
       * Horário em que a devolução foi feita.
       *
       * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
       */
      solicitacao: dayjs(this.#props.horario.solicitacao),
    }
  }

  /**
   * O campo status no retorno do webhook representa a situação da requisição de envio direto de um Pix para uma chave Pix, podendo assumir os seguintes estados:
   *
   * `"EM_PROCESSAMENTO","REALIZADO", "NAO_REALIZADO"`
   */
  get status() {
    return this.#props.status
  }

  toObject(props?: {
    formatProps?: MonetaryValueToObjectProps['formatProps']
  }) {
    const formatProps = props?.formatProps

    return {
      id: this.id,
      rtrId: this.rtrId,
      valor: this.valor.toObject({ formatProps }),
      horario: {
        solicitacao: this.horario.solicitacao.toDate(),
      },
      status: this.status,
    }
  }
}
