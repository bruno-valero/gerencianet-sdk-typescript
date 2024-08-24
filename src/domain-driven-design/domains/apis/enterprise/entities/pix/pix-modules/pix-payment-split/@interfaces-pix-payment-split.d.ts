import { TxId } from '../@types-common'
import { PixDueChargeResponseType } from '../pix-due-charge/@interfaces-pix-due-charge'
import { PixImediateChargeResponseCreationProps } from '../pix-imediate-charge/pix-imediate-charge-response'
import { Descricao, Favorecido, Split } from './@types-pix-payment-split'

export interface PixPaymentSplitCreateProps {
  /**
   *
   * ---
   *
   * O campo id determina o identificador do Split de pagamento.
   *
   * O `id` é criado pela pessoa recebedora e está sob sua responsabilidade. Porém, se não for informado, o `id` será definido pela Efí, fazendo uma exceção à regra padrão.
   *
   * ---
   *
   * `string` (Id do Split) `^[a-zA-Z0-9]{1,35}$`
   */
  id?: string
  body: {
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
    descricao: Descricao
    /**
     * O campo txid determina o identificador da transação. Para mais detalhes [clique aqui](https://dev.efipay.com.br/docs/api-pix/glossario).
     *
     * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
     *
     * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
     * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
     *
     * - string (Id da Transação) `^[a-zA-Z0-9]{26,35}$`
     */
    txid?: TxId
    /**
     * `Object (Lancamento)`
     */
    lancamento: {
      /**
       * `(boolean)`
       */
      imediato: boolean
    }
    /**
     * `Object (Split)`
     */
    split: {
      /**
       *
       * ---
       *
       * Maneira a qual a tarifa será cobrada.
       *
       * ---
       *
       * `(string)` Ex: `"assumir_total"` ou `"proporcional"`
       */
      divisaoTarifa: 'assumir_total' | 'proporcional'
      /**
       *
       * ---
       *
       * Define o repasse para a conta do cliente que está configurando o Split.
       *
       * ---
       *
       * `(string)`
       */
      minhaParte: Split
      /**
       * Define os repasses para as contas dos beneficiários que não o cliente configurador do Split
       *
       * ---
       *
       * `(array)`
       */
      repasses: (Split & {
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
        favorecido: Favorecido
      })[]
    }
  }
}

export interface PixPaymentSplitFindUniqueProps {
  /**
   *
   * ---
   *
   * O campo id determina o identificador do Split de pagamento.
   *
   * ---
   *
   * `string` (Id do Split) `^[a-zA-Z0-9]{1,35}$`
   */
  id: string

  searchParams?: {
    /**
     *
     * ---
     *
     * Permite recuperar revisões anteriores da configuração de split. Na ausência desse parâmetro, sempre será retornada a cobrança conforme consta em sua última revisão.
     *
     * ---
     *
     * `Integer($int32)`
     */
    revisao?: number
  }
}

export interface PixPaymentSplitAttachImediateChargeProps {
  /**
   * O campo txid determina o identificador da transação. Para mais detalhes [clique aqui](https://dev.efipay.com.br/docs/api-pix/glossario).
   *
   * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
   *
   * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
   * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
   *
   * - string (Id da Transação) `^[a-zA-Z0-9]{26,35}$`
   */
  txid: TxId
  /**
   * O campo `splitConfigId` determina o identificador do Split de pagamento.
   */
  splitConfigId
}

export interface PixPaymentSplitAttachDueChargeProps
  extends PixPaymentSplitAttachImediateChargeProps {}

export interface PixPaymentSplitFindUniqueImediateChargeAttachmentProps {
  /**
   * O campo txid determina o identificador da transação. Para mais detalhes [clique aqui](https://dev.efipay.com.br/docs/api-pix/glossario).
   *
   * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
   *
   * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
   * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
   *
   * - string (Id da Transação) `^[a-zA-Z0-9]{26,35}$`
   */
  txid: TxId
}

export interface PixPaymentSplitFindUniqueDueChargeAttachmentProps
  extends PixPaymentSplitFindUniqueImediateChargeAttachmentProps {}

export interface PixPaymentSplitFindUniqueImediateChargeAttachmentResponseType
  extends PixImediateChargeResponseCreationProps {
  config: {
    id: string
    status: string
    descricao: string
  }
}

export interface PixPaymentSplitFindUniqueDueChargeAttachmentResponseType
  extends PixDueChargeResponseType {
  config: {
    id: string
    status: string
    descricao: string
  }
}

export interface PixPaymentSplitDeleteImediateChargeAttachmentProps
  extends PixPaymentSplitFindUniqueImediateChargeAttachmentProps {}

type PixPaymentSplitCreatePropsBody = PixPaymentSplitCreateProps['body']

export interface PixPaymentSplitResponseType
  extends PixPaymentSplitCreatePropsBody {
  status: string
  id: string
}
