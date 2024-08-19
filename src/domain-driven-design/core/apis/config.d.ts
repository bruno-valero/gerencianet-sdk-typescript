import { PathLike } from 'node:fs'
import https from 'node:https'

import {
  AuthRoute,
  BaseUrl,
  EnvironmentTypes,
  OperationTypes,
} from './constants-callbacks'

export interface EfiConfig<
  type extends EnvironmentTypes,
  operation extends OperationTypes | undefined = undefined,
> {
  client_id: string
  client_secret: string
  certificate?: PathLike | string
  pemKey?: PathLike | string
  sandbox: boolean
  partnerToken?: string
  rawResponse?: unknown
  baseUrl?: BaseUrl<type, operation>
  validateMtls?: boolean
  authRoute?: AuthRoute<operation>
  agent?: https.Agent
}
