import {
  ApiArrayResponse,
  ApiArrayResponseProps,
} from '@/domain-driven-design/core/apis/api-array-response'

import { PixChargeResponseTypeArray } from '../@interfaces-common'
import { PixImediateChargeResponseType } from './@interfaces-pix-imediate-charge'
import { PixImediateChargeResponse } from './pix-imediate-charge-response'

export class PixImediateChargeResponseArray extends ApiArrayResponse<
  typeof PixImediateChargeResponse
> {
  constructor(
    props: PixChargeResponseTypeArray<PixImediateChargeResponseType>,
  ) {
    const data: ApiArrayResponseProps<PixImediateChargeResponseType> = {
      arrayData: props.cobs,
      parametros: props.parametros,
    }
    super(data, PixImediateChargeResponse)
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
