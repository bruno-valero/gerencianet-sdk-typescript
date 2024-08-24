/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import fs from 'node:fs'
import https from 'node:https'

import axios, { AxiosError } from 'axios'

import { EfiConfig } from '@/domain-driven-design/core/apis/config'
import {
  AuthRoute,
  BaseUrl,
  ConstantsCallbacks,
  constantsCallbacks,
  EnvironmentTypes,
  OperationTypes,
} from '@/domain-driven-design/core/apis/constants-callbacks'

import {
  GetAccessTokenRequestParams,
  GetAccessTokenResponse,
} from './auth-types'

// import sdkPackage from '../package.json'
// import { EfiConfig } from './interfaces/efiConfig.interface'
// import { EndpointInterface } from './interfaces/endpoint.interface'

class Auth<type extends EnvironmentTypes, operation extends OperationTypes> {
  private constants: ConstantsCallbacks

  private client_id: string

  private client_secret: string

  private baseUrl?: BaseUrl<type>

  private agent!: https.Agent

  private authRoute!: AuthRoute

  #options: EfiConfig<type, operation>

  constructor(options: EfiConfig<type, operation>) {
    this.constants = constantsCallbacks
    this.client_id = options.client_id
    this.client_secret = options.client_secret
    this.baseUrl = options.baseUrl
    this.#options = options

    if (options.agent) {
      this.agent = options.agent
    }
    if (options.authRoute) {
      this.authRoute = options.authRoute
    }
  }

  get options() {
    return this.#options
  }

  public async getAccessToken(): Promise<GetAccessTokenResponse<operation>> {
    // console.log('getAccessToken - this.baseUrl:', this.baseUrl)

    if (!this.baseUrl) return null
    const environment = this.options.sandbox ? 'SANDBOX' : 'PRODUCTION'
    let postParams: GetAccessTokenRequestParams<typeof environment>

    if (
      this.constants.APIS.DEFAULT.URL.PRODUCTION === this.baseUrl ||
      this.constants.APIS.DEFAULT.URL.SANDBOX === this.baseUrl
    ) {
      postParams = {
        method: 'POST',
        url: `${this.baseUrl}${this.constants.APIS.DEFAULT.ENDPOINTS.authorize().route}`,
        headers: {
          'api-sdk': 'typescript-1.0.2',
        },
        data: {
          grant_type: 'client_credentials',
        },
        auth: {
          username: this.client_id,
          password: this.client_secret,
        },
      }
    } else {
      const data_credentials = `${this.client_id}:${this.client_secret}`
      const auth = Buffer.from(data_credentials).toString('base64')

      // this.getAgent
      const agent = this.getAgent()
      if (!agent) throw new Error('cannot build http agent')
      this.agent = agent
      postParams = {
        method: 'POST',
        url: `${this.baseUrl}${this.authRoute.route}`,
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
          'api-sdk': 'typescript-1.0.2',
        },
        httpsAgent: this.agent,
        data: {
          grant_type: 'client_credentials',
        },
      }
    }

    try {
      const { data } =
        await axios<GetAccessTokenResponse<operation>>(postParams)

      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('error.response:', error.response)
        console.log('error.cause:', error.cause)
      } else {
        console.log('error:', error)
      }
      return null
    }
  }

  getAgent() {
    try {
      if (this.options.certificate) {
        if (this.options.pemKey) {
          switch (this.options.certificateType) {
            case 'file':
              this.#options.agent = new https.Agent({
                cert: fs.readFileSync(this.options.certificate),
                key: fs.readFileSync(this.options.pemKey),
                passphrase: '',
              })
              break

            case 'buffer':
              if (!(this.options.certificate instanceof Buffer))
                throw new Error(
                  `"options.certificate" is not instance of "Buffer"`,
                )
              if (!(this.options.pemKey instanceof Buffer))
                throw new Error(`"options.pemKey" is not instance of "Buffer"`)

              this.#options.agent = new https.Agent({
                cert: this.options.certificate,
                key: this.options.pemKey,
                passphrase: '',
              })
              break
            case 'base64':
              if (!(this.options.certificate instanceof String))
                throw new Error(
                  `"options.certificate" is not instance of "Buffer"`,
                )
              if (!(this.options.pemKey instanceof String))
                throw new Error(`"options.pemKey" is not instance of "Buffer"`)

              this.#options.agent = new https.Agent({
                cert: Buffer.from(this.options.certificate, 'base64'),
                key: Buffer.from(this.options.pemKey, 'base64'),
                passphrase: '',
              })
              break
          }
        } else {
          this.#options.agent = new https.Agent({
            pfx: fs.readFileSync(this.options.certificate),
            passphrase: '',
          })
        }
      }
      return this.#options.agent
    } catch (error) {
      throw new Error(
        `FALHA AO LER O CERTIFICADO. \nVerifique se o caminho informado está correto: ${this.options.certificate}\n`,
      )
    }
  }
}

export default Auth
