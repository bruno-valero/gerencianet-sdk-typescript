import {
  ApiArrayResponse,
  ApiArrayResponseProps,
} from '@/domain-driven-design/core/apis/api-array-response'

import { PixChargeResponseTypeArray } from '../@interfaces-common'
import { PixPayloadLocationsResponseType } from './@interfaces-pix-payload-locations'
import { PixPayloadLocationsResponse } from './pix-payload-locations-response'

export class PixPayloadLocationsResponseArray extends ApiArrayResponse<
  typeof PixPayloadLocationsResponse
> {
  constructor(
    props: PixChargeResponseTypeArray<PixPayloadLocationsResponseType, 'loc'>,
  ) {
    const data: ApiArrayResponseProps<PixPayloadLocationsResponseType> = {
      arrayData: props.loc,
      parametros: props.parametros,
    }
    super(data, PixPayloadLocationsResponse)
  }

  get loc() {
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
      loc: this.loc.map((item) => item.toObject()),
    }
  }
}
