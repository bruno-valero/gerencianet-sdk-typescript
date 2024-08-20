import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EfiConfig } from '@/domain-driven-design/core/apis/config'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'
import { Optional } from '@/domain-driven-design/core/types/optional'

import { PixDueCharge } from './pix-modules/pix-due-charge'
import { PixImediateCharge } from './pix-modules/pix-imediate-charge'

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

  constructor({ type, options }: PixRequestProps<type>) {
    super(type, 'PIX', options)
    options.authRoute = this.endpoints.ENDPOINTS.authorize()
    this.#imediateCharge = new PixImediateCharge(type, 'PIX', options)
    this.#dueCharge = new PixDueCharge(type, 'PIX', options)
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
}
