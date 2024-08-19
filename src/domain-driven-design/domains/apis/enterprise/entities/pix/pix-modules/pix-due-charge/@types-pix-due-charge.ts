import { StatesShort } from '../../../value-objects/address/state'

/**
 * Os campos aninhados sob o objeto devedor são opcionais e identificam o devedor, ou seja, a pessoa ou a instituição a quem a cobrança está endereçada. Não identifica, necessariamente, quem irá efetivamente realizar o pagamento. Um CPF pode ser o devedor de uma cobrança, mas pode acontecer de outro CPF realizar, efetivamente, o pagamento do documento. Não é permitido que o campo pagador.cpf e campo pagador.cnpj estejam preenchidos ao mesmo tempo. Se o campo pagador.cnpj está preenchido, então o campo pagador.cpf não pode estar preenchido, e vice-versa. Se o campo pagador.nome está preenchido, então deve existir ou um pagador.cpf ou um campo pagador.cnpj preenchido.
 *
 * - Pessoa Física (object) or Pessoa Jurídica (object)
 */
export type Devedor = {
  /**
   * CPF do usuário pagador.string `/^\d{11}$/`
   */
  cpf?: string
  /**
   * CNPJ do usuário pagador.string `/^\d{14}$/`
   */
  cnpj?: string
  /**
   * Nome do usuário pagador. string (Nome) `≤ 200 characters`
   */
  nome: string
  /**
   * Email do usuário pagador. string (Email)
   */
  email?: string
  /**
   * Logradouro do usuário pagador. string (Logradouro) `≤ 200 characters`
   */
  logradouro: string
  /**
   * Cidade do usuário pagador. string (Cidade) `≤ 200 characters`
   */
  cidade: string
  /**
   * UF do usuário pagador. string (UF) `≤ 2 characters`
   */
  uf: StatesShort
  /**
   * CEP do usuário pagador. string (CEP) `≤ 8 characters`
   */
  cep: string
}

/**
 * Os campos aninhados sob o objeto devedor são opcionais e identificam o recebedor, ou seja, a pessoa ou a instituição a quem será beneficiada. Não é permitido que o campo recebedor.cpf e campo recebedor.cnpj estejam preenchidos ao mesmo tempo. Se o campo recebedor.cnpj está preenchido, então o campo recebedor.cpf não pode estar preenchido, e vice-versa. Se o campo recebedor.nome está preenchido, então deve existir ou um recebedor.cpf ou um campo recebedor.cnpj preenchido.
 *
 * - Pessoa Física (object) or Pessoa Jurídica (object)
 */
export type Recebedor = Devedor

/**
 * Os campos aninhados sob o identificador **calendário** organizam informações a respeito de controle de tempo da cobrança.
 */
export type CalendarioRequest = {
  /**
   * Trata-se de uma data, no formato YYYY-MM-DD, segundo ISO 8601. É a data de vencimento da cobrança. A cobrança pode ser honrada até esse dia, inclusive, em qualquer horário do dia. (String ).
   */
  dataDeVencimento: `${string}-${string}-${string}`
  /**
   * Trata-se da quantidade de dias corridos após calendario.dataDeVencimento, em que a cobrança poderá ser paga.
   *
   * Sempre que a data de vencimento cair em um fim de semana ou em um feriado para o usuário pagador, ela deve ser automaticamente prorrogada para o primeiro dia útil subsequente. Todos os campos que façam referência a esta data (`validadeAposVencimento`; `desconto`; `juros` e `multa`) devem assumir essa prorrogação, quando for o caso. (Integer <int 16>).
   *
   * Para entender o funcionamento do pagamento após o vencimento, veja os exemplos neste [link](https://dev.efipay.com.br/docs/api-pix/glossario#section-ilustra-o-do-funcionamento-das-cobran-as-cobv-ap-s-a-data-de-vencimento).
   */
  validadeAposVencimento: number
}
/**
 * Os campos aninhados sob o identificador **calendário** organizam informações a respeito de controle de tempo da cobrança.
 */
export type CalendarioResponse = CalendarioRequest & {
  /**
   * Data de criação no formato ISO-String
   */
  criacao: string
}

/**
 * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
 */
export type Valor = {
  /**
   * Valor original da cobrança.string `\d{1,10}\ .\d{2}`
   */
  original: string
  /**
   * Multa aplicada à cobrança. `object`
   */
  multa: {
    /**
     * Modalidade da multa, conforme tabela de domínios. `integer <1 | 2>`
     *
     * - 1: Valor Fixo
     * - 2: Valor Percentual
     */
    modalidade: 1 | 2
    /**
     *  Multa do documento em valor absoluto ou percentual, conforme "valor.multa.modalidade". string `\d{1,10}\.\d{2}`
     */
    valorPerc: string
  }
  /**
   * Juros aplicado à cobrança. `object`
   */
  juros: {
    /**
     * Modalidade da juros, conforme tabela de domínios. `integer <1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>`
     *
     * - 1: Valor (dias corridos)
     * - 2: Percentual ao dia (dias corridos)
     * - 3: Percentual ao mês (dias corridos)
     * - 4: Percentual ao ano (dias corridos)
     * - 5: Valor (dias úteis)
     * - 6: Percentual ao dia  (dias úteis)
     * - 7: Percentual ao mês (dias úteis)
     * - 8: Percentual ao ano (dias úteis)
     */
    modalidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    /**
     * Juros do documento. string `\d{1,10}\.\d{2}`
     */
    valorPerc: string
  }
  /**
   * Abatimento aplicado à cobrança. `object`
   */
  abatimento?: {
    /**
     * Modalidade de abatimentos, conforme tabela de domínios. `integer <1 | 2>`
     *
     * - 1: Valor Fixo
     * - 2: Valor Percentual
     */
    modalidade: 1 | 2
    /**
     * Abatimentos ou outras deduções aplicadas ao documento, em valor absoluto ou percentual do valor original do documento. string `\d{1,10}\.\d{2}`
     */
    valorPerc: string
  }
  /**
   * Descontos aplicados à cobrança. `object`
   */
  desconto: {
    /**
     * Modalidade de desconto, conforme tabela de domínios. `integer <1 | 2 | 3 | 4 | 5 | 6>`
     *
     * - 1: Valor Fixo até a[s] data[s] informada[s]
     * - 2: Percentual até a data informada
     * - 3: Valor por antecipação dia corrido
     * - 4: Valor por antecipação dia útil
     * - 5: Percentual por antecipação dia corrido
     * - 6: Percentual por antecipação dia útil
     */
    modalidade: 1 | 2 | 3 | 4 | 5 | 6
    /**
     * Descontos absolutos aplicados à cobrança. `Array of objects`
     */
    descontoDataFixa: {
      data: `${string}-${string}-${string}`
      /**
       * Abatimentos ou outras deduções aplicadas ao documento, em valor absoluto ou percentual do valor original do documento. `string \d{1,10}\.\d{2}`
       */
      valorPerc: string
    }[]
  }
}

/**
 * Identificador da localização do payload. Para associar a location a uma cobrança com vencimento, este location gerado deve ser do tipo cobv.
 */
export type LocRequest = {
  /**
   * id do location a ser associada a cobrança com vencimento. int
   */
  id: number
}
