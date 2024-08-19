import https from 'node:https'

import {
  AuthRoute,
  BaseUrl,
  ConstantsCallbacks,
  EnvironmentTypes,
  OperationTypes,
} from '@/domain-driven-design/core/apis/constants-callbacks'

export type GetAccessTokenRequestParams<
  type extends EnvironmentTypes,
  key extends keyof ConstantsCallbacks['APIS'] | undefined = undefined,
> =
  | {
      method: 'POST'
      url: `${BaseUrl<type, key>}${AuthRoute<key>['route']}`
      headers: {
        'api-sdk': `typescript-${'1.0.2'}`
      }
      data: {
        grant_type: 'client_credentials'
      }
      auth: {
        username: string
        password: string
      }
    }
  | {
      method: 'POST'
      url: `${BaseUrl<type, key>}${AuthRoute<key>['route']}`
      headers: {
        Authorization: `Basic ${string}`
        'Content-Type': 'application/json'
        'api-sdk': `typescript-${sdkPackage.version}`
      }
      httpsAgent: https.Agent
      data: {
        grant_type: 'client_credentials'
      }
    }

type TokenType =
  | 'Bearer'
  | 'Basic'
  | 'Digest'
  | 'Hawk'
  | 'ApiKey'
  | 'MAC'
  | 'AWS4-HMAC-SHA256'

export type PixAuthResponse = {
  access_token: string
  token_type: TokenType
  expires_in: number
  scope: string
} | null
export type DefaultAuthResponse = {
  access_token: string
  token_type: TokenType
  expires_in: number
  scope: string
} | null
export type OpenFinanceAuthResponse = {
  access_token: string
  token_type: TokenType
  expires_in: number
  scope: string
} | null
export type PagamentosAuthResponse = {
  access_token: string
  token_type: TokenType
  expires_in: number
  scope: string
} | null
export type ContasAuthResponse = {
  access_token: string
  token_type: TokenType
  expires_in: number
  scope: string
} | null

export type GetAccessTokenResponse<operation extends OperationTypes> = {
  PIX: PixAuthResponse
  DEFAULT: DefaultAuthResponse
  OPENFINANCE: OpenFinanceAuthResponse
  PAGAMENTOS: PagamentosAuthResponse
  CONTAS: ContasAuthResponse
}[operation]
