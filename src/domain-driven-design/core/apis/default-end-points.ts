export const defaultEndpoints = {
  URL: {
    PRODUCTION: `https://api.gerencianet.com.br/v1`,
    SANDBOX: `https://sandbox.gerencianet.com.br/v1`,
  },
  ENDPOINTS: {
    authorize: () =>
      ({
        route: `/authorize`,
        method: `post`,
      }) as const,
    sendSubscriptionLinkEmail: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/subscription/resend`,
        method: `post`,
      }) as const,
    oneStepSubscription: ({ id }: { id: string }) =>
      ({
        route: `/plan/${id}/subscription/one-step`,
        method: `post`,
      }) as const,
    settleCarnet: ({ id }: { id: string }) =>
      ({
        route: `/carnet/${id}/settle`,
        method: `put`,
      }) as const,
    oneStepSubscriptionLink: ({ id }: { id: string }) =>
      ({
        route: `/plan/${id}/subscription/one-step/link`,
        method: `post`,
      }) as const,
    sendLinkEmail: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/link/resend`,
        method: `post`,
      }) as const,
    createOneStepLink: () =>
      ({
        route: `/charge/one-step/link`,
        method: `post`,
      }) as const,
    createCharge: () =>
      ({
        route: `/charge`,
        method: `post`,
      }) as const,
    detailCharge: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}`,
        method: `get`,
      }) as const,
    updateChargeMetadata: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/metadata`,
        method: `put`,
      }) as const,
    updateBillet: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/billet`,
        method: `put`,
      }) as const,
    definePayMethod: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/pay`,
        method: `post`,
      }) as const,
    cancelCharge: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/cancel`,
        method: `put`,
      }) as const,
    createCarnet: () =>
      ({
        route: `/carnet`,
        method: `post`,
      }) as const,
    detailCarnet: ({ id }: { id: string }) =>
      ({
        route: `/carnet/${id}`,
        method: `get`,
      }) as const,
    updateCarnetParcel: ({ id, parcel }: { id: string; parcel: string }) =>
      ({
        route: `/carnet/${id}/parcel/${parcel}`,
        method: `put`,
      }) as const,
    updateCarnetMetadata: ({ id }: { id: string }) =>
      ({
        route: `/carnet/${id}/metadata`,
        method: `put`,
      }) as const,
    getNotification: ({ token }: { token: string }) =>
      ({
        route: `/notification/${token}`,
        method: `get`,
      }) as const,
    listPlans: () =>
      ({
        route: `/plans`,
        method: `get`,
      }) as const,
    createPlan: () =>
      ({
        route: `/plan`,
        method: `post`,
      }) as const,
    deletePlan: ({ id }: { id: string }) =>
      ({
        route: `/plan/${id}`,
        method: `delete`,
      }) as const,
    createSubscription: ({ id }: { id: string }) =>
      ({
        route: `/plan/${id}/subscription`,
        method: `post`,
      }) as const,
    detailSubscription: ({ id }: { id: string }) =>
      ({
        route: `/subscription/${id}`,
        method: `get`,
      }) as const,
    defineSubscriptionPayMethod: ({ id }: { id: string }) =>
      ({
        route: `/subscription/${id}/pay`,
        method: `post`,
      }) as const,
    cancelSubscription: ({ id }: { id: string }) =>
      ({
        route: `/subscription/${id}/cancel`,
        method: `put`,
      }) as const,
    updateSubscriptionMetadata: ({ id }: { id: string }) =>
      ({
        route: `/subscription/${id}/metadata`,
        method: `put`,
      }) as const,
    getInstallments: () =>
      ({
        route: `/installments`,
        method: `get`,
      }) as const,
    sendBilletEmail: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/billet/resend`,
        method: `post`,
      }) as const,
    createChargeHistory: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/history`,
        method: `post`,
      }) as const,
    sendCarnetEmail: ({ id }: { id: string }) =>
      ({
        route: `/carnet/${id}/resend`,
        method: `post`,
      }) as const,
    sendCarnetParcelEmail: ({ id, parcel }: { id: string; parcel: string }) =>
      ({
        route: `/carnet/${id}/parcel/${parcel}/resend`,
        method: `post`,
      }) as const,
    createCarnetHistory: ({ id }: { id: string }) =>
      ({
        route: `/carnet/${id}/history`,
        method: `post`,
      }) as const,
    cancelCarnet: ({ id }: { id: string }) =>
      ({
        route: `/carnet/${id}/cancel`,
        method: `put`,
      }) as const,
    cancelCarnetParcel: ({ id, parcel }: { id: string; parcel: string }) =>
      ({
        route: `/carnet/${id}/parcel/${parcel}/cancel`,
        method: `put`,
      }) as const,
    linkCharge: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/link`,
        method: `post`,
      }) as const,
    defineLinkPayMethod: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/link`,
        method: `post`,
      }) as const,
    updateChargeLink: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/link`,
        method: `put`,
      }) as const,
    updatePlan: ({ id }: { id: string }) =>
      ({
        route: `/plan/${id}`,
        method: `put`,
      }) as const,
    createSubscriptionHistory: ({ id }: { id: string }) =>
      ({
        route: `/subscription/${id}/history`,
        method: `post`,
      }) as const,
    defineBalanceSheetBillet: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/balance-sheet`,
        method: `post`,
      }) as const,
    settleCharge: ({ id }: { id: string }) =>
      ({
        route: `/charge/${id}/settle`,
        method: `put`,
      }) as const,
    settleCarnetParcel: ({ id, parcel }: { id: string; parcel: string }) =>
      ({
        route: `/carnet/${id}/parcel/${parcel}/settle`,
        method: `put`,
      }) as const,
    createOneStepCharge: () =>
      ({
        route: `/charge/one-step`,
        method: `post`,
      }) as const,
  },
} as const

export type DefaultEndpoints = typeof defaultEndpoints
