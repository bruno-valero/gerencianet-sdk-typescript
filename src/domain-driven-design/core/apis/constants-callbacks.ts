import { contasEndpoints } from './contas-end-points'
import { defaultEndpoints } from './default-end-points'
import { openFinanceEndpoints } from './open-finance-end-points'
import { pagamentosEndpoints } from './pagamentos-end-points'
import { pixEndpoints } from './pix-end-points'

export const constantsCallbacks = {
  APIS: {
    PIX: pixEndpoints,
    DEFAULT: defaultEndpoints,
    OPENFINANCE: openFinanceEndpoints,
    PAGAMENTOS: pagamentosEndpoints,
    CONTAS: contasEndpoints,
  },
} as const

export type ConstantsCallbacks = typeof constantsCallbacks

export type OperationTypes = keyof ConstantsCallbacks['APIS']

type Auth<key extends OperationTypes> = ReturnType<
  ConstantsCallbacks['APIS'][key]['ENDPOINTS']['authorize']
>

export type EnvironmentTypes = 'PRODUCTION' | 'SANDBOX'

export type AuthRoute<key extends OperationTypes | undefined = undefined> =
  key extends undefined
    ?
        | Auth<'PIX'>
        | Auth<'DEFAULT'>
        | Auth<'OPENFINANCE'>
        | Auth<'PAGAMENTOS'>
        | Auth<'CONTAS'>
    : key extends OperationTypes
      ? Auth<key>
      : void

type UrlBase<
  type extends OperationTypes,
  operation extends EnvironmentTypes,
> = ConstantsCallbacks['APIS'][type]['URL'][operation]

export type BaseUrl<
  operation extends EnvironmentTypes,
  type extends OperationTypes | undefined = undefined,
> = type extends undefined
  ?
      | UrlBase<'PIX', operation>
      | UrlBase<'DEFAULT', operation>
      | UrlBase<'OPENFINANCE', operation>
      | UrlBase<'PAGAMENTOS', operation>
      | UrlBase<'CONTAS', operation>
  : type extends OperationTypes
    ? UrlBase<type, operation>
    : void
