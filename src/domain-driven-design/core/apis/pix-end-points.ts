export const pixEndpoints = {
  URL: {
    PRODUCTION: 'https://pix.api.efipay.com.br',
    SANDBOX: 'https://pix-h.api.efipay.com.br',
  },
  ENDPOINTS: {
    authorize: () =>
      ({
        route: '/oauth/token',
        method: 'post',
      }) as const,
    pixCreateDueCharge: ({ txid }: { txid: string }) =>
      ({
        route: `/v2/cobv/${txid}`,
        method: `put`,
      }) as const,
    pixUpdateDueCharge: ({ txid }: { txid: string }) =>
      ({
        route: `/v2/cobv/${txid}`,
        method: `patch`,
      }) as const,
    pixDetailDueCharge: ({ txid }: { txid: string }) =>
      ({
        route: `/v2/cobv/${txid}`,
        method: `get`,
      }) as const,
    pixListDueCharges: () =>
      ({
        route: `/v2/cobv/`,
        method: `get`,
      }) as const,
    createReport: () =>
      ({
        route: `/v2/gn/relatorios/extrato-conciliacao`,
        method: `post`,
      }) as const,
    detailReport: ({ id }: { id: string }) =>
      ({
        route: `/v2/gn/relatorios/${id}`,
        method: `get`,
      }) as const,
    pixCreateCharge: ({ txid }: { txid: string }) =>
      ({
        route: `/v2/cob/${txid}`,
        method: `put`,
      }) as const,
    pixUpdateCharge: ({ txid }: { txid: string }) =>
      ({
        route: `/v2/cob/${txid}`,
        method: `patch`,
      }) as const,
    pixCreateImmediateCharge: () =>
      ({
        route: `/v2/cob`,
        method: `post`,
      }) as const,
    pixDetailCharge: ({ txid }: { txid: string }) =>
      ({
        route: `/v2/cob/${txid}`,
        method: `get`,
      }) as const,
    pixListCharges: () =>
      ({
        route: `/v2/cob`,
        method: `get`,
      }) as const,
    pixDetailReceived: ({ e2eId }: { e2eId: string }) =>
      ({
        route: `/v2/pix/${e2eId}`,
        method: `get`,
      }) as const,
    pixReceivedList: () =>
      ({
        route: `/v2/pix`,
        method: `get`,
      }) as const,
    pixSend: ({ idEnvio }: { idEnvio: string }) =>
      ({
        route: `/v2/gn/pix/${idEnvio}`,
        method: `put`,
      }) as const,
    pixSendDetail: ({ e2eId }: { e2eId: string }) =>
      ({
        route: `/v2/gn/pix/enviados/${e2eId}`,
        method: `get`,
      }) as const,
    pixSendList: () =>
      ({
        route: `/v2/gn/pix/enviados`,
        method: `get`,
      }) as const,
    pixDevolution: ({ id, e2eId }: { id: string; e2eId: string }) =>
      ({
        route: `/v2/pix/${e2eId}/devolucao/${id}`,
        method: `put`,
      }) as const,
    pixDetailDevolution: ({ id, e2eId }: { id: string; e2eId: string }) =>
      ({
        route: `/v2/pix/${e2eId}/devolucao/${id}`,
        method: `get`,
      }) as const,
    pixConfigWebhook: ({ chave }: { chave: string }) =>
      ({
        route: `/v2/webhook/${chave}`,
        method: `put`,
      }) as const,
    pixDetailWebhook: ({ chave }: { chave: string }) =>
      ({
        route: `/v2/webhook/${chave}`,
        method: `get`,
      }) as const,
    pixListWebhook: () =>
      ({
        route: `/v2/webhook`,
        method: `get`,
      }) as const,
    pixDeleteWebhook: ({ chave }: { chave: string }) =>
      ({
        route: `/v2/webhook/${chave}`,
        method: `delete`,
      }) as const,
    pixCreateDueChargeBatch: ({ id }: { id: number }) =>
      ({
        route: `/v2/lotecobv/${id}`,
        method: `put`,
      }) as const,
    pixUpdateDueChargeBatch: ({ id }: { id: number }) =>
      ({
        route: `/v2/lotecobv/${id}`,
        method: `patch`,
      }) as const,
    pixDetailDueChargeBatch: ({ id }: { id: number }) =>
      ({
        route: `/v2/lotecobv/${id}`,
        method: `get`,
      }) as const,
    pixListDueChargeBatch: () =>
      ({
        route: `/v2/lotecobv/`,
        method: `get`,
      }) as const,
    pixCreateLocation: () =>
      ({
        route: `/v2/loc`,
        method: `post`,
      }) as const,
    pixLocationList: () =>
      ({
        route: `/v2/loc`,
        method: `get`,
      }) as const,
    pixDetailLocation: ({ id }: { id: number }) =>
      ({
        route: `/v2/loc/${id}`,
        method: `get`,
      }) as const,
    pixGenerateQRCode: ({ id }: { id: number }) =>
      ({
        route: `/v2/loc/${id}/qrcode`,
        method: `get`,
      }) as const,
    pixUnlinkTxidLocation: ({ id }: { id: number }) =>
      ({
        route: `/v2/loc/${id}/txid`,
        method: `delete`,
      }) as const,
    pixCreateEvp: () =>
      ({
        route: `/v2/gn/evp`,
        method: `post`,
      }) as const,
    pixListEvp: () =>
      ({
        route: `/v2/gn/evp`,
        method: `get`,
      }) as const,
    pixDeleteEvp: ({ chave }: { chave: string }) =>
      ({
        route: `/v2/gn/evp/${chave}`,
        method: `delete`,
      }) as const,
    getAccountBalance: () =>
      ({
        route: `/v2/gn/saldo`,
        method: `get`,
      }) as const,
    updateAccountConfig: () =>
      ({
        route: `/v2/gn/config`,
        method: `put`,
      }) as const,
    listAccountConfig: () =>
      ({
        route: `/v2/gn/config`,
        method: `get`,
      }) as const,
    pixSplitDetailCharge: ({ txid }: { txid: string }) =>
      ({
        route: `/v2/gn/split/cob/${txid}`,
        method: `get`,
      }) as const,
    pixSplitLinkCharge: ({
      txid,
      splitConfigId,
    }: {
      txid: string
      splitConfigId: string
    }) =>
      ({
        route: `/v2/gn/split/cob/${txid}/vinculo/${splitConfigId}`,
        method: `put`,
      }) as const,
    pixSplitUnlinkCharge: ({ txid }: { txid: string }) =>
      ({
        route: `/v2/gn/split/cob/${txid}/vinculo`,
        method: `delete`,
      }) as const,
    pixSplitDetailDueCharge: ({ txid }: { txid: string }) =>
      ({
        route: `/v2/gn/split/cobv/${txid}`,
        method: `get`,
      }) as const,
    pixSplitLinkDueCharge: ({
      txid,
      splitConfigId,
    }: {
      txid: string
      splitConfigId: string
    }) =>
      ({
        route: `/v2/gn/split/cobv/${txid}/vinculo/${splitConfigId}`,
        method: `put`,
      }) as const,
    pixSplitUnlinkDueCharge: ({ txid }: { txid: string }) =>
      ({
        route: `/v2/gn/split/cobv/${txid}/vinculo`,
        method: `delete`,
      }) as const,
    pixSplitConfig: () =>
      ({
        route: `/v2/gn/split/config`,
        method: `post`,
      }) as const,
    pixSplitConfigId: ({ id }: { id: string }) =>
      ({
        route: `/v2/gn/split/config/${id}`,
        method: `put`,
      }) as const,
    pixSplitDetailConfig: ({ id }: { id: string }) =>
      ({
        route: `/v2/gn/split/config/${id}`,
        method: `get`,
      }) as const,
    pixSendDetailId: ({ idEnvio }: { idEnvio: string }) =>
      ({
        route: `/v2/gn/pix/enviados/id-envio/${idEnvio}`,
        method: `get`,
      }) as const,
  },
} as const

export type PixEndpoints = typeof pixEndpoints
