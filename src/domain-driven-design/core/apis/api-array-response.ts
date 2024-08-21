import dayjs from 'dayjs'

import { ConstructorSingleParameters } from './api-request'
import { ApiResponse } from './api-response'

export type ArrayKey = 'cobs' | 'webhooks'

export type ArrayParameters = {
  inicio: string
  fim: string
  paginacao: {
    paginaAtual: number
    itensPorPagina: number
    quantidadeDePaginas: number
    quantidadeTotalDeItens: number
  }
}

export interface ApiArrayResponseProps<ArrayData> {
  parametros: ArrayParameters
  arrayData: ArrayData[]
}

export abstract class ApiArrayResponse<
  ArrayData extends new (
    // eslint-disable-next-line
      // @ts-ignore
    props: ConstructorSingleParameters<ArrayData>,
  ) => InstanceType<ArrayData>,
> extends ApiResponse {
  protected props: {
    parametros: {
      inicio: Date
      fim: Date
      paginacao: {
        paginaAtual: number
        itensPorPagina: number
        quantidadeDePaginas: number
        quantidadeTotalDeItens: number
      }
    }
    arrayData: InstanceType<ArrayData>[]
  }

  constructor(
    // eslint-disable-next-line
    // @ts-ignore
    props: ApiArrayResponseProps<ConstructorSingleParameters<ArrayData>>,
    CobClass: ArrayData,
  ) {
    super()
    this.props = {
      arrayData: props.arrayData.map((item) => new CobClass(item)),
      parametros: {
        inicio: new Date(props.parametros.inicio),
        fim: new Date(props.parametros.fim),
        paginacao: {
          paginaAtual: props.parametros.paginacao.paginaAtual,
          itensPorPagina: props.parametros.paginacao.itensPorPagina,
          quantidadeDePaginas: props.parametros.paginacao.quantidadeDePaginas,
          quantidadeTotalDeItens:
            props.parametros.paginacao.quantidadeTotalDeItens,
        },
      },
    }
  }

  /**
   * Filtro dos registros cuja data de criação seja maior ou igual que a data de início. Respeita RFC 3339.
   */
  get inicio() {
    return dayjs(this.props.parametros.inicio)
  }

  /**
   * Filtro dos registros cuja data de criação seja menor ou igual que a data de fim. Respeita RFC 3339.
   */
  get fim() {
    return dayjs(this.props.parametros.fim)
  }

  /**
   * Paginação - indica a página atual.
   */
  get paginaAtual() {
    return this.props.parametros.paginacao.paginaAtual
  }

  /**
   * Paginação - indica a quantidade de itens por página.
   */
  get itensPorPagina() {
    return this.props.parametros.paginacao.itensPorPagina
  }

  /**
   * Paginação - indica a quantidade total de páginas.
   */
  get quantidadeDePaginas() {
    return this.props.parametros.paginacao.quantidadeDePaginas
  }

  /**
   * Paginação - indica a quantidade total de itens.
   */
  get quantidadeTotalDeItens() {
    return this.props.parametros.paginacao.quantidadeTotalDeItens
  }

  /**
   * Cobranças - retorna uma lista de cobranças, correspondendo à paginação atual.
   */
  protected get arrayData() {
    return this.props.arrayData
  }

  abstract toObject(...props: unknown[]): unknown

  toJson(
    replacer?: Parameters<typeof JSON.stringify>[1],
    space?: Parameters<typeof JSON.stringify>[2],
  ) {
    return JSON.stringify(this.toObject(), replacer, space)
  }
}
