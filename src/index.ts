import { PathLike } from 'node:fs'

import { EfiConfig } from './domain-driven-design/core/apis/config'
import {
  EnvironmentTypes,
  OperationTypes,
} from './domain-driven-design/core/apis/constants-callbacks'
import { Optional } from './domain-driven-design/core/types/optional'
import { PixRequest } from './domain-driven-design/domains/apis/enterprise/entities/pix/pix'
import { env } from './env'

type Options<
  type extends EnvironmentTypes,
  operation extends OperationTypes | undefined = undefined,
> = Optional<EfiConfig<type, operation>, 'sandbox'>

type OptionsCredentials = {
  client_id?: string
  client_secret?: string
  certificate?: PathLike
}

interface MakeOptionsProps<
  type extends EnvironmentTypes,
  operation extends OperationTypes | undefined,
> {
  type: type
  operation?: operation
  data?: OptionsCredentials
}

function makeOptions<
  type extends EnvironmentTypes,
  operation extends OperationTypes | undefined,
>({ type, operation, data }: MakeOptionsProps<type, operation>) {
  if (!type) throw new Error('type is missing')
  if (
    ![
      'PIX',
      'DEFAULT',
      'OPENFINANCE',
      'PAGAMENTOS',
      'CONTAS',
      undefined,
    ].includes(operation)
  )
    throw new Error(
      'operation must be one of those: "PIX" | "DEFAULT" | "OPENFINANCE" | "PAGAMENTOS" | "CONTAS" | undefined = undefined',
    )

  const opt: Options<type, operation> = {
    client_id: data?.client_id || env.CLIENT_ID_HOMOLOGACAO,
    client_secret: data?.client_secret || env.CLIENT_SECRET_HOMOLOGACAO,
    certificate: data?.certificate || env.CERTIFICADO_HOMOLOGACAO_PATH,
  }

  return opt
}

class EfiPay<type extends EnvironmentTypes> {
  #pix: PixRequest<type>

  constructor(type: type, options?: OptionsCredentials) {
    this.#pix = new PixRequest({
      type,
      options: makeOptions({
        type,
        operation: 'PIX',
        data: {
          certificate: options?.certificate,
          client_id: options?.client_id,
          client_secret: options?.client_secret,
        },
      }),
    })
  }

  /**
   * A API Pix Efí oferece recursos avançados para integração com sua aplicação, permitindo que você crie soluções personalizadas e ofereça opções de pagamento inovadoras aos seus clientes. Com nossa API é possível criar cobranças, verificar os Pix recebidos, devolver e enviar Pix.
   *
   * Para integrar a API Pix Efí ao seu sistema ou sua plataforma, é necessário ter uma Conta Digital Efí. Uma vez com acesso, você poderá obter as credenciais e o certificado necessários para a comunicação com a API Pix Efí.
   *
   * [Condira a Documentação oficial para mais detalhes](https://dev.efipay.com.br/docs/api-pix/credenciais)
   */
  get pix() {
    return this.#pix
  }
}

export default EfiPay
