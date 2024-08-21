import { ArrayParameters } from '@/domain-driven-design/core/apis/api-array-response'

import {
  CnpjFilterSearch,
  CpfFilterSearch,
  FimFilterSearch,
  InicioFilterSearch,
  ItensPorPaginaFilterSearch,
  PaginaAtualFilterSearch,
  StatusFilterSearch,
} from './@types-common'

// type Parameters = {
//   inicio: string
//   fim: string
//   paginacao: {
//     paginaAtual: number
//     itensPorPagina: number
//     quantidadeDePaginas: number
//     quantidadeTotalDeItens: number
//   }
// }

type ArrayKey = 'cobs' | 'webhooks'

export type PixChargeResponseTypeArray<
  ArrayData,
  ArrKey extends ArrayKey = 'cobs',
> = ArrKey extends 'cobs'
  ? {
      parametros: ArrayParameters
      cobs: ArrayData[]
    }
  : ArrKey extends 'webhooks'
    ? {
        parametros: ArrayParameters
        webhooks: ArrayData[]
      }
    : never

export interface PixFilterSearchProps {
  searchParams: {
    /**
     * Filtra os registros cuja data de criação seja maior ou igual que a data de início. Respeita RFC 3339.
     *
     * - `string`
     */
    inicio: InicioFilterSearch
    /**
     * Filtra os registros cuja data de criação seja menor ou igual que a data de fim. Respeita RFC 3339.
     *
     * - `string`
     */
    fim: FimFilterSearch
    /**
     * Filtro pelo CPF do pagador. Não pode ser utilizado ao mesmo tempo que o CNPJ.
     *
     * - string `/^\d{11}$/`
     */
    cpf?: CpfFilterSearch
    /**
     * Filtro pelo CNPJ do pagador. Não pode ser utilizado ao mesmo tempo que o CPF.
     *
     * - string `/^\d{14}$/`
     */
    cnpj?: CnpjFilterSearch
    /**
     * Filtro pelo status da cobrança.
     *
     * - Enum: `"ATIVA"`,`"CONCLUIDA"`, `"REMOVIDA_PELO_USUARIO_RECEBEDOR"`, `"REMOVIDA_PELO_PSP"`
     */
    status?: StatusFilterSearch
    /**
     * Página a ser retornada pela consulta. Se não for informada, o PSP assumirá que será 0.
     *
     * - integer {int32} (Página atual) `>= 0`
     * - Default: `0`
     */
    'paginacao.paginaAtual'?: PaginaAtualFilterSearch
    /**
     * Quantidade máxima de registros retornados em cada página. Apenas a última página pode conter uma quantidade menor de registros.
     *
     * - integer {int32} (Página atual) `[1 .. 1000]`
     * - Default: `100`
     */
    'paginacao.itensPorPagina'?: ItensPorPaginaFilterSearch
  }
}
