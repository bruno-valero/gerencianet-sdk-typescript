import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EfiConfig } from '@/domain-driven-design/core/apis/config'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'
import { Optional } from '@/domain-driven-design/core/types/optional'

import { PixDueCharge } from './pix-modules/pix-due-charge'
import { PixImediateCharge } from './pix-modules/pix-imediate-charge'
import { PixManage } from './pix-modules/pix-manage'
import { PixSendAndPayment } from './pix-modules/pix-send-and-payment'
import { PixWebhooks } from './pix-modules/pix-webhooks'

interface PixRequestProps<type extends EnvironmentTypes> {
  type: type
  options: Optional<EfiConfig<type, 'PIX'>, 'sandbox'>
}

/**
 * A API Pix Efí oferece recursos avançados para integração com sua aplicação, permitindo que você crie soluções personalizadas e ofereça opções de pagamento inovadoras aos seus clientes. Com nossa API é possível criar cobranças, verificar os Pix recebidos, devolver e enviar Pix.
 *
 * Para integrar a API Pix Efí ao seu sistema ou sua plataforma, é necessário ter uma Conta Digital Efí. Uma vez com acesso, você poderá obter as credenciais e o certificado necessários para a comunicação com a API Pix Efí.
 *
 * [Condira a Documentação oficial para mais detalhes](https://dev.efipay.com.br/docs/api-pix/credenciais)
 */
export class PixRequest<type extends EnvironmentTypes> extends ApiRequest<
  type,
  'PIX'
> {
  #imediateCharge: PixImediateCharge<type>
  #dueCharge: PixDueCharge<type>
  #sendAndPayment: PixSendAndPayment<type>
  #webhooks: PixWebhooks<type>
  #manage: PixManage<type>

  constructor({ type, options }: PixRequestProps<type>) {
    super(type, 'PIX', options)
    options.authRoute = this.endpoints.ENDPOINTS.authorize()
    this.#imediateCharge = new PixImediateCharge(type, 'PIX', options)
    this.#dueCharge = new PixDueCharge(type, 'PIX', options)
    this.#sendAndPayment = new PixSendAndPayment(type, 'PIX', options)
    this.#webhooks = new PixWebhooks(type, 'PIX', options)
    this.#manage = new PixManage(type, 'PIX', options)
  }

  /**
   * Responsável pela gestão de cobranças imediatas. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
   */
  get imediateCharge() {
    return this.#imediateCharge
  }

  /**
   * responsável pela gestão de cobranças imediatas. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
   */
  get dueCharge() {
    return this.#dueCharge
  }

  /**
   *  Traz as funcionalidades disponíveis para a gestão do Envio de Pix e do Pagamento de QR Codes Pix
   */
  get sendAndPayment() {
    return this.#sendAndPayment
  }

  /**
   * gerenciamento de notificações por parte do PSP recebedor a pessoa usuária recebedora.
   */
  get webhooks() {
    return this.#webhooks
  }

  /**
   * Gestão das transações Pix, isto é, a manutenção dos recebimentos e devoluções Pix.
   */
  get manage() {
    return this.#manage
  }

  // eslint-disable-next-line
  // @ts-ignore
  useCredentials({
    clientId,
    clientSecret,
  }: {
    clientId: string
    clientSecret: string
  }) {
    const type = this.type
    const options = this.options
    const pix = new PixRequest({
      type,
      options: {
        ...options,
        client_id: clientId,
        client_secret: clientSecret,
      },
    })

    return pix
  }
}
