import https from 'node:https'

import axios, { AxiosError } from 'axios'

import { EfiConfig } from '@/domain-driven-design/core/apis/config'
import {
  ConstantsCallbacks,
  constantsCallbacks,
  EnvironmentTypes,
  OperationTypes,
} from '@/domain-driven-design/core/apis/constants-callbacks'
import { Optional } from '@/domain-driven-design/core/types/optional'
import Auth from '@/domain-driven-design/domains/apis/enterprise/entities/auth'

export type ConstructorSingleParameters<
  T extends abstract new (arg: unknown) => unknown,
> = T extends abstract new (arg: infer P) => unknown ? P : never

export type SearchParamsType = Record<string, string | number | Date | boolean>

export abstract class ApiRequest<
  type extends EnvironmentTypes,
  operation extends OperationTypes,
> {
  #constants: ConstantsCallbacks
  #endpoints: ConstantsCallbacks['APIS'][operation]
  #options: EfiConfig<type, operation>
  #auth: Auth<type, operation>
  #baseUrl: ConstantsCallbacks['APIS'][operation]['URL'][type]
  #type: type
  #operation: operation
  constructor(
    type: type,
    operation: operation,
    options: Optional<EfiConfig<type, operation>, 'sandbox'>,
  ) {
    this.#constants = constantsCallbacks
    this.#endpoints = this.#constants.APIS[operation]
    this.#baseUrl = this.#endpoints.URL[type]
    this.#type = type
    this.#operation = operation

    const optionsComplete: EfiConfig<type, operation> = {
      ...options,
      sandbox: type === 'SANDBOX',
      // eslint-disable-next-line
      // @ts-ignore
      baseUrl: this.#baseUrl,
      // eslint-disable-next-line
      // @ts-ignore
      authRoute: this.#endpoints.ENDPOINTS.authorize(),
    }
    this.#options = optionsComplete
    this.#auth = new Auth<type, operation>(optionsComplete)
  }

  protected get type() {
    return this.#type
  }

  protected get operation() {
    return this.#operation
  }

  protected get environment() {
    return this.#options.sandbox ? 'SANDBOX' : 'PRODUCTION'
  }

  protected get endpoints() {
    return this.#endpoints
  }

  protected get options() {
    return this.#options
  }

  protected get auth() {
    return this.#auth
  }

  protected get baseUrl() {
    return this.#baseUrl
  }

  get config() {
    return {
      environment: this.environment,
      endpoints: this.endpoints,
      options: this.options,
      auth: this.auth,
      baseUrl: this.baseUrl,
    }
  }

  protected makeHeaders({ accessToken }: { accessToken: string }) {
    const headers = {
      'api-sdk': `efi-typescript-${'1.0.2'}`,
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
      'x-skip-mtls-checking': !this.options.validateMtls,
    } as const

    const optionalHeaders: typeof headers & { 'partner-token'?: string } = {
      ...headers,
    }

    if (this.options.partnerToken) {
      optionalHeaders['partner-token'] = this.options.partnerToken
    }

    return optionalHeaders
  }

  protected makeRequest<
    Method,
    Url extends string,
    SearchParams extends SearchParamsType,
    Body,
  >({
    accessToken,
    method,
    searchParams,
    routeUrl,
    body,
  }: {
    accessToken: string
    method: Method
    searchParams?: SearchParams
    routeUrl: Url
    body?: Body
  }) {
    const headers = this.makeHeaders({ accessToken })
    const url = new URL(routeUrl)
    Object.entries(searchParams ?? {}).forEach(([key, value]) => {
      url.searchParams.append(
        key,
        value instanceof Date ? value.toISOString() : String(value),
      )
    })

    const req = {
      method,
      url: url.toString(),
      headers,
      data: body,
    } as const

    const request: typeof req & { httpsAgent?: https.Agent } = { ...req }

    if (
      this.options.baseUrl !== this.#constants.APIS.DEFAULT.URL.PRODUCTION &&
      this.options.baseUrl !== this.#constants.APIS.DEFAULT.URL.SANDBOX
    ) {
      request.httpsAgent = this.auth.getAgent()
    }

    return request
  }

  protected async sendRequest<
    Route extends string,
    Method extends string,
    SearchParams extends Record<string, string | number | Date | boolean>,
    Body,
    ResponseClassType extends new (
      // eslint-disable-next-line
      // @ts-ignore
      args: ConstructorSingleParameters<ResponseClassType>,
    ) => InstanceType<ResponseClassType>,
  >({
    route,
    body,
    method,
    searchParams,
    ResponseClass,
  }: {
    route: Route
    body?: Body
    method: Method
    searchParams?: SearchParams
    ResponseClass: ResponseClassType
  }) {
    const token = await this.auth.getAccessToken()

    if (!token) return null

    const { access_token: accessToken } = token

    const url = `${this.baseUrl}${route}` as const

    const request = this.makeRequest({
      accessToken,
      body,
      method,
      routeUrl: url,
      searchParams,
    })

    try {
      const { data } =
        // eslint-disable-next-line
      // @ts-ignore
        await axios<ConstructorSingleParameters<typeof ResponseClass>>(request)

      const response = new ResponseClass(data)

      return response
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('error on request:', error.response?.data)
      } else {
        console.log('error on request:', error)
      }
      return null
    }
  }

  abstract useCredentials<T>(props: {
    clientId: string
    clientSecret: string
    Instance: T
  }): T
}
