/**
 *
 * ---
 *
 * O campo descricao , opcional, determina um texto a ser apresentado na criação da configuração do Split em formato livre. Esse texto será preenchido pelo criador da configuração do Split. O tamanho do campo está limitado a 80 caracteres (string).
 *
 * ---
 *
 * `string`
 */
export type Descricao = string

/**
 *
 * ---
 *
 * Define o tipo de repasse, se é porcentagem ou fixo.
 *
 * ---
 *
 * `(string)` Ex: `'porcentagem'` ou `'fixo'`
 *
 */
export type Tipo = 'porcentagem' | 'fixo'
/**
 *
 * ---
 *
 * Define o valor que será repassado. Se o tipo for `"porcentagem"`,  representa a porcentagem, caso contrário representará o valor nominal
 *
 * ---
 *
 * `(string)`. Ex: `"60.00"` `(60%)`
 */
export type valor = string

export type Split = {
  /**
   *
   * ---
   *
   * Define o tipo de repasse, se é porcentagem ou fixo.
   *
   * ---
   *
   * `(string)` Ex: `'porcentagem'` ou `'fixo'`
   *
   */
  tipo: Tipo
  /**
   *
   * ---
   *
   * Define o valor que será repassado. Se o tipo for `"porcentagem"`,  representa a porcentagem, caso contrário representará o valor nominal
   *
   * ---
   *
   * `(string)`. Ex: `"60.00"` `(60%)`
   */
  valor: valor
}

/**
 *
 * ---
 *
 * Define os dados do favorecido.
 *
 * ---
 *
 * (object)
 */
export type Favorecido =
  | {
      /**
       * CPF do favorecido.string `/^\d{11}$/`
       */
      cpf: string
      /**
       * CNPJ do favorecido.string `/^\d{14}$/`
       */
      cnpj?: undefined
      /**
       * Número da conta do favorecido (incluindo digito final, sem o hífen).
       */
      conta: string
    }
  | {
      /**
       * CNPJ do favorecido.string `/^\d{14}$/`
       */
      cnpj: string
      /**
       * CPF do favorecido.string `/^\d{11}$/`
       */
      cpf?: undefined
      /**
       * Número da conta do favorecido (incluindo digito final, sem o hífen).
       */
      conta: string
    }
