/**
 * O campo idEnvio determina o identificador da transação. `string \d{1,10}\.\d{2}`
 */
export type IdEnvio = string

/**
 * Valores monetários referentes à cobrança.
 *
 * string `\d{1,10}\.\d{2}`
 */
export type Valor = string

/**
 * O campo pagador contém a chave Pix associada a conta autenticada que será debitado o valor definido.
 */
export type Pagador = {
  /**
   * O campo chave determina a chave Pix registrada no DICT que será utilizada identificar o pagador do Pix. string (Chave DICT do pagador) `≤ 77 characters`
   */
  chave: string
  /**
   * Informação do pagador sobre o Pix a ser enviado. `string < 140`
   */
  infoPagador?: string
}

/**
 * O campo favorecido contém a chave Pix ou os dados bancários que será creditado o valor definido.
 */
export type Favorecido =
  | {
      /**
       * O campo chave determina a chave Pix registrada no DICT que será utilizada identificar o recebedor do Pix. string (Chave DICT do recebedor) `≤ 77 characters`
       */
      chave: string
      /**
       * O campo cpf valida se a chave Pix registrada no DICT pertence ao titular do documento informado
       */
      cpf?: string
      /**
       * O campo cnpj valida se a chave Pix registrada no DICT pertence ao titular do documento informado
       */
      cnpj?: string
    }
  | {
      contaBanco:
        | {
            /**
             * Nome do recebedor (string) `< 200 characters`
             */
            nome: string
            /**
             * CPF do recebedor (string) `^[0-9]{11}$`
             */
            cpf: string
            /**
             *  [ISPB do Banco do recebedor](https://www.bcb.gov.br/content/estabilidadefinanceira/str1/ParticipantesSTR.pdf) (string) `^[0-9]{8}$`
             */
            codigoBanco: string
            /**
             * Agência do recebedor no seu Banco, sem o dígito verificador (string) `^[0-9]{1,4}$`
             */
            agencia: string
            /**
             * Conta do recebedor no seu Banco com o dígito verificador, sem traço - (string) `^[0-9]+`
             */
            conta: string
            /**
             * Tipo da conta do recebedor no seu Banco, podendo ser: `cacc` (Conta corrente) ou `svgs` (poupança)
             */
            tipoConta: 'cacc' | 'svgs'
          }
        | {
            /**
             * Nome do recebedor (string) `< 200 characters`
             */
            nome: string
            /**
             * CNPJ do recebedor (string) ^[0-9]{14}$
             */
            cnpj: string
            /**
             *  [ISPB do Banco do recebedor](https://www.bcb.gov.br/content/estabilidadefinanceira/str1/ParticipantesSTR.pdf) (string) `^[0-9]{8}$`
             */
            codigoBanco: string
            /**
             * Agência do recebedor no seu Banco, sem o dígito verificador (string) `^[0-9]{1,4}$`
             */
            agencia: string
            /**
             * Conta do recebedor no seu Banco com o dígito verificador, sem traço - (string) `^[0-9]+`
             */
            conta: string
            /**
             * Tipo da conta do recebedor no seu Banco, podendo ser: `cacc` (Conta corrente) ou `svgs` (poupança)
             */
            tipoConta: 'cacc' | 'svgs'
          }
    }
