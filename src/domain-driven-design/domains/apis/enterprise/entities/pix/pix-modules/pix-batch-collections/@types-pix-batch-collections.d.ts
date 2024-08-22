import { TxId } from '../@types-common'
import { PixDueChargeCreateProps } from '../pix-due-charge/@interfaces-pix-due-charge'

/**
 * O campo id determina o Id do lote de cobranças com vencimento.
 *
 * - `integer (int64)`
 */
export type BatchCollectionId = number

/**
 * Descrição do lote.
 */
export type BatchCollectionDescription = string

/**
 * O objeto cobsv organiza as informações dos dados enviados para criação ou alteração da cobrança com vencimento via API Pix.
 */
export type Cobvs = (PixDueChargeCreateProps['body'] & {
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
})[]

export type Status = 'EM_PROCESSAMENTO' | 'CRIADA' | 'NEGADA'
