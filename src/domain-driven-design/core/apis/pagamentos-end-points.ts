export const pagamentosEndpoints = {
  URL: {
    PRODUCTION: `https://apis.gerencianet.com.br/pagamento`,
    SANDBOX: `https://apis-h.gerencianet.com.br/pagamento`,
  },
  ENDPOINTS: {
    authorize: () =>
      ({
        route: `/oauth/token`,
        method: `post`,
      }) as const,
    payDetailBarCode: ({ codBarras }: { codBarras: string }) =>
      ({
        route: `/codBarras/${codBarras}`,
        method: `GET`,
      }) as const,
    payRequestBarCode: ({ codBarras }: { codBarras: string }) =>
      ({
        route: `/codBarras/${codBarras}`,
        method: `POST`,
      }) as const,
    payDetailPayment: ({ idPagamento }: { idPagamento: string }) =>
      ({
        route: `/${idPagamento}`,
        method: `GET`,
      }) as const,
    payListPayments: () =>
      ({
        route: `/resumo`,
        method: `GET`,
      }) as const,
  },
} as const

export type PagamentosEndpoints = typeof pagamentosEndpoints
