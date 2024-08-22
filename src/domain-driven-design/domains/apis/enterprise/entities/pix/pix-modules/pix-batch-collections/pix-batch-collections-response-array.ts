import {
  ApiArrayResponse,
  ApiArrayResponseProps,
} from '@/domain-driven-design/core/apis/api-array-response'

import { PixChargeResponseTypeArray } from '../@interfaces-common'
import { PixBatchCollectionsBatchResponseType } from './@interfaces-pix-batch-collections'
import { PixBatchCollectionsResponse } from './pix-batch-collections-response'

export class PixBatchCollectionsResponseArray extends ApiArrayResponse<
  typeof PixBatchCollectionsResponse
> {
  constructor(
    props: PixChargeResponseTypeArray<
      PixBatchCollectionsBatchResponseType,
      'lotes'
    >,
  ) {
    const data: ApiArrayResponseProps<PixBatchCollectionsBatchResponseType> = {
      arrayData: props.lotes,
      parametros: props.parametros,
    }
    super(data, PixBatchCollectionsResponse)
  }

  get lotes() {
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
      lotes: this.lotes.map((item) => item.toObject()),
    }
  }
}
