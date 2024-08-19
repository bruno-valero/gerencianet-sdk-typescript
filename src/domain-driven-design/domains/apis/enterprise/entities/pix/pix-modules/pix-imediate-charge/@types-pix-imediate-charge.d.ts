/**
 * Os campos aninhados sob o identificador calendário organizam informações a respeito de controle de tempo da cobrança.
 */
export type CalendarioRequest = {
  /**
   * Tempo de vida da cobrança, especificado em segundos a partir da data de criação (Calendario.criacao). Recebe um numero com valor mínimo de 1 e máximo integer int32, passado como integer.
   */
  expiracao: number
}
/**
 * Os campos aninhados sob o identificador calendário organizam informações a respeito de controle de tempo da cobrança.
 */
export type CalendarioResponse = {
  /**
   * Timestamp que indica o momento em que foi criada a cobrança. Respeita o formato definido na RFC 3339. Mínimo de 1 caractere e máximo de 255 caracteres (String).
   */
  criacao: string
  /**
   * Tempo de vida da cobrança, especificado em segundos a partir da data de criação (Calendario.criacao). Recebe um numero com valor mínimo de 1 e máximo integer int32, passado como integer.
   */
  expiracao: number
}

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
}

/**
 * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
 */
export type Valor = {
  /**
   * Valor original da cobrança.string `\d{1,10}\.\d{2}`
   */
  original: string
}

/**
 * Identificador da localização do payload.
 */
export type LocUpdate = {
  /**
   * ID do location a ser associada a cobrança. `int32`
   */
  id: number
}
