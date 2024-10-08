import {
  ApiArrayResponse,
  ApiArrayResponseProps,
} from '@/domain-driven-design/core/apis/api-array-response'

import { PixChargeResponseTypeArray } from '../@interfaces-common'
import { PixDueChargeResponseType } from './@interfaces-pix-due-charge'
import { PixDueChargeResponse } from './pix-due-charge-response'

export class PixDueChargeResponseArray extends ApiArrayResponse<
  typeof PixDueChargeResponse
> {
  constructor(props: PixChargeResponseTypeArray<PixDueChargeResponseType>) {
    const data: ApiArrayResponseProps<PixDueChargeResponseType> = {
      arrayData: props.cobs,
      parametros: props.parametros,
    }
    super(data, PixDueChargeResponse)
  }

  get cobs() {
    return this.arrayData
  }

  toObject() {
    return {
      parametros: {
        inicio: this.inicio.toDate(),
        fim: this.fim.toDate(),
        paginaAtual: this.paginaAtual,
        itensPorPagina: this.itensPorPagina,
        quantidadeDePaginas: this.quantidadeDePaginas,
        quantidadeTotalDeItens: this.quantidadeTotalDeItens,
      },
      cobs: this.cobs.map((item) => item.toObject()),
    }
  }
}
