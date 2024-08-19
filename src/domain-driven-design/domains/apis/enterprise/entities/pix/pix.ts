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

  get imediateCharge() {
    return this.#imediateCharge
  }

  get dueCharge() {
    return this.#dueCharge
  }
}
