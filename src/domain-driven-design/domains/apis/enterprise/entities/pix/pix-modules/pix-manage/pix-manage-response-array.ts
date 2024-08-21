import {
  ApiArrayResponse,
  ApiArrayResponseProps,
} from '@/domain-driven-design/core/apis/api-array-response'

import { PixChargeResponseTypeArray } from '../@interfaces-common'
import { PixManageResponseType } from './@interfaces-pix-manage'
import { PixManageResponse } from './pix-manage-response'

export class PixManageResponseArray extends ApiArrayResponse<
  typeof PixManageResponse
> {
  constructor(props: PixChargeResponseTypeArray<PixManageResponseType, 'pix'>) {
    const data: ApiArrayResponseProps<PixManageResponseType> = {
      arrayData: props.pix,
      parametros: props.parametros,
    }
    super(data, PixManageResponse)
  }

  get pix() {
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
      pix: this.pix.map((item) => item.toObject()),
    }
  }
}
