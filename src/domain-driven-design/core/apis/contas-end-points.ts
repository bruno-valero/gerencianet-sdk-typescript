export const contasEndpoints = {
  URL: {
    PRODUCTION: `https://apis.gerencianet.com.br`,
    SANDBOX: `https://apis-h.gerencianet.com.br`,
  },
  ENDPOINTS: {
    authorize: () =>
      ({
        route: `/oauth/token`,
        method: `post`,
      }) as const,
    createAccount: () =>
      ({
        route: `/cadastro/conta-simplificada`,
        method: `post`,
      }) as const,
    createAccountCertificate: ({ identificador }: { identificador: string }) =>
      ({
        route: `/cadastro/conta-simplificada/${identificador}/certificado`,
        method: `post`,
      }) as const,
    getAccountCredentials: ({ identificador }: { identificador: string }) =>
      ({
        route: `/cadastro/conta-simplificada/${identificador}/credenciais`,
        method: `get`,
      }) as const,
    accountConfigWebhook: () =>
      ({
        route: `/cadastro/webhook`,
        method: `post`,
      }) as const,
    accountDeleteWebhook: ({ identificador }: { identificador: string }) =>
      ({
        route: `/cadastro/webhook/${identificador}Webhook`,
        method: `delete`,
      }) as const,
    accountDetailWebhook: ({ identificador }: { identificador: string }) =>
      ({
        route: `/cadastro/webhook/${identificador}Webhook`,
        method: `get`,
      }) as const,
    accountListWebhook: () =>
      ({
        route: `/cadastro/webhooks`,
        method: `get`,
      }) as const,
  },
} as const

export type ContasEndpoints = typeof contasEndpoints
