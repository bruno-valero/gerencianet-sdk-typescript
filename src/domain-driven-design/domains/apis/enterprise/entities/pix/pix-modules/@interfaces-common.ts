export interface PixChargeResponseTypeArray<Cob> {
  parametros: {
    inicio: string
    fim: string
    paginacao: {
      paginaAtual: number
      itensPorPagina: number
      quantidadeDePaginas: number
      quantidadeTotalDeItens: number
    }
  }
  cobs: Cob[]
}
