import { PixFilterSearchParamsProps } from '../@interfaces-common'
import {
  BatchCollectionDescription,
  BatchCollectionId,
  Cobvs,
  Status,
} from './@types-pix-batch-collections'

export interface PixBatchCollectionsCreateOrUpdateDueChargeBatchProps {
  /**
   * O campo id determina o Id do lote de cobranças com vencimento.
   *
   * - `integer (int64)`
   */
  id: BatchCollectionId
  body: {
    /**
     * Descrição do lote.
     */
    descricao: BatchCollectionDescription
    /**
     * O objeto cobsv organiza as informações dos dados enviados para criação ou alteração da cobrança com vencimento via API Pix.
     */
    cobsv: Cobvs
  }
}

export interface PixBatchCollectionsUpdateDueChargeBatchProps {
  /**
   * O campo id determina o Id do lote de cobranças com vencimento.
   *
   * - `integer (int64)`
   */
  id: BatchCollectionId
  body: {
    /**
     * Descrição do lote.
     */
    descricao?: BatchCollectionDescription
    /**
     * O objeto cobsv organiza as informações dos dados enviados para criação ou alteração da cobrança com vencimento via API Pix.
     */
    cobsv: Cobvs
  }
}

export interface PixBatchCollectionsFindUniqueDueChargeBatchProps {
  /**
   * O campo id determina o Id do lote de cobranças com vencimento.
   *
   * - `integer (int64)`
   */
  id: BatchCollectionId
}

export interface PixBatchCollectionsFindManyDueChargeBatchProps {
  searchParams: Omit<PixFilterSearchParamsProps, 'status'> & {
    status?: Status
  }
}

export interface PixBatchCollectionsBatchResponseType {
  descricao: 'teste'
  /**
   * Data de criação do Lote de Cobrança
   *
   * ISO String no formato `{year}-{month}-{day}T{hour}:{minute}:{seconds}.{milliseconds}Z`
   */
  criacao: string
  cobsv: {
    /**
     * Data de criação da cobrança com vencimento
     *
     * ISO String no formato `{year}-{month}-{day}T{hour}:{minute}:{seconds}.{milliseconds}Z`
     */
    criacao?: string

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
    status: Status
    /**
     * Esta propriedade se apresenta apenas quando há uma rejeição durante a criação da cobrança
     */
    problema?: {
      type: string
      /** Título que representa a rejeição */
      title: string
      status: number
      /** Descrição sobre a rejeição */
      detail: string
      /**
       * Violações cometidas para que a rejeição ocorresse
       */
      violacoes: [
        {
          /**
           * Descrição da violação
           */
          razao: string
          /**
           * Campo que originou a violação
           */
          propriedade: string
        },
      ]
    }
  }[]
}
