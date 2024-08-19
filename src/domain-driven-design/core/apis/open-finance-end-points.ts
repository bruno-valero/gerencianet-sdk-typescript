export const openFinanceEndpoints = {
  URL: {
    PRODUCTION: `https://apis.gerencianet.com.br/open-finance`,
    SANDBOX: `https://apis-h.gerencianet.com.br/open-finance`,
  },
  ENDPOINTS: {
    authorize: () =>
      ({
        route: `/oauth/token`,
        method: `post`,
      }) as const,
    ofListParticipants: () =>
      ({
        route: `/participantes/`,
        method: `GET`,
      }) as const,
    ofStartPixPayment: () =>
      ({
        route: `/pagamentos/pix`,
        method: `POST`,
      }) as const,
    ofListPixPayment: () =>
      ({
        route: `/pagamentos/pix`,
        method: `GET`,
      }) as const,
    ofConfigUpdate: () =>
      ({
        route: `/config`,
        method: `PUT`,
      }) as const,
    ofConfigDetail: () =>
      ({
        route: `/config`,
        method: `GET`,
      }) as const,
    ofDevolutionPix: ({
      identificadorPagamento,
    }: {
      identificadorPagamento: string
    }) =>
      ({
        route: `/pagamentos/pix/${identificadorPagamento}/devolver`,
        method: `post`,
      }) as const,
  },
} as const

export type OpenFinanceEndpoints = typeof openFinanceEndpoints
