import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EfiConfig } from '@/domain-driven-design/core/apis/config'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'
import { Optional } from '@/domain-driven-design/core/types/optional'

import { Card } from './cobranca-modules/card'

interface CobrancasRequestProps<type extends EnvironmentTypes> {
  type: type
  options: Optional<EfiConfig<type, 'DEFAULT'>, 'sandbox' | 'certificateType'>
}

/**
 *
 * ---
 *
 * A API Cobranças Efí oferece recursos avançados que permitem emitir diferentes tipos de cobranças, tais como **Boleto**, **Cartão de crédito**, **Carnê**, **Links de pagamento**, **Assinaturas (Recorrência)** e **Marketplace (Split de pagamento)**.
 *
 * Para integrar a API Cobranças Efí ao seu sistema ou sua plataforma, **é necessário ter uma Conta Digital Efí**. Após obter o acesso à conta, você poderá adquirir as credenciais necessárias para estabelecer a comunicação com a API Cobranças Efí.
 *
 * ---
 *
 * [Confira a Documentação oficial para mais detalhes](https://dev.efipay.com.br/docs/api-cobrancas/credenciais)
 *
 * ---
 *
 */
export class CobrancaRequest<type extends EnvironmentTypes> extends ApiRequest<
  type,
  'DEFAULT'
> {
  #card: Card<type>
  constructor({ type, options }: CobrancasRequestProps<type>) {
    super(type, 'DEFAULT', options)
    this.#card = new Card(type, 'DEFAULT', options)
  }

  /**
   *
   * ---
   *
   * As transações online via cartão de crédito exigem apenas a numeração de face e o código no verso do cartão, o que pode resultar em transações suspeitas. Por isso, é importante adotar procedimentos de segurança para evitar prejuízos financeiros, como o Chargeback.
   *
   * Quando uma transação com cartão de crédito é realizada, ela passa por três etapas: autorização da operadora, análise de segurança e captura. Cada transação é analisada para identificar possíveis riscos. Se for aprovada, o valor é debitado na fatura do cliente. Caso contrário, o valor fica reservado até que a comunicação reversa seja concluída e o limite do cartão seja reestabelecido.
   *
   * ---
   *
   * ### Lista de Cartões aceitos pela Efí Pay
   *
   * - Visa
   * - Master
   * - AmericanExpress
   * - Elo
   * - Hipercard
   *
   * ---
   *
   * ### Atenção!
   *
   * Para fazer o pagamento com cartão de crédito,***é necessário obter o payment_token*** da transação. Portanto, é imprescindível seguir os procedimentos para [obter o payment_token](https://dev.efipay.com.br/docs/api-cobrancas/cartao#obten%C3%A7%C3%A3o-do-payment_token) conforme descrito no documento antes de criar a cobrança com cartão de crédito.
   *
   * Outra informação importante é você precisa cadastrar o ramo de atividade em sua conta. Confira mais detalhes [aqui](https://sejaefi.com.br/artigo/inserir-ramo-de-atividade/#versao-7).
   *
   * ---
   *
   * ### Tokenização de cartão
   *
   * Se você precisa reutilizar o payment_token para fins de recorrência, utilize o atributo `reuse` com o valor booleano `true`. Dessa forma, o payment_token pode ser usado em mais de uma transação de forma segura, sem a necessidade de salvar os dados do cartão
   *
   * ---
   *
   * ### Simulação em Ambiente de Homologação
   *
   * A simulação de cobranças de cartão em ambiente de Homologação funciona com base na análise imediata de acordo com o último dígito do número do cartão de crédito utilizado:
   *
   * - Cartão com final 1 retorna: `"reason":"Dados do cartão inválidos."`
   * - Cartão com final 2 retorna: `"reason":"Transação não autorizada por motivos de segurança."`
   * - Cartão com final 3 retorna: `"reason":"Transação não autorizada, tente novamente mais tarde."`
   * - Demais finais têm transação aprovada.
   *
   */
  get card() {
    return this.#card
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
    const request = new CobrancaRequest({
      type,
      options: {
        ...options,
        client_id: clientId,
        client_secret: clientSecret,
      },
    })

    return request
  }
}
