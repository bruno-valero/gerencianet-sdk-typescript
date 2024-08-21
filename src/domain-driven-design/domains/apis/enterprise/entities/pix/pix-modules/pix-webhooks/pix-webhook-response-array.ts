import {
  ApiArrayResponse,
  ApiArrayResponseProps,
} from '@/domain-driven-design/core/apis/api-array-response'

import { PixChargeResponseTypeArray } from '../@interfaces-common'
import { PixWebhooksResponseType } from './@interfaces-pix-webhooks'
import { PixWebhooksResponse } from './pix-webhook-response'

export class PixWebhooksResponseArray extends ApiArrayResponse<
  typeof PixWebhooksResponse
> {
  constructor(
    props: PixChargeResponseTypeArray<PixWebhooksResponseType, 'webhooks'>,
  ) {
    const data: ApiArrayResponseProps<PixWebhooksResponseType> = {
      arrayData: props.webhooks,
      parametros: props.parametros,
    }
    super(data, PixWebhooksResponse)
  }

  get webhooks() {
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
      webhooks: this.webhooks.map((item) => item.toObject()),
    }
  }
}
