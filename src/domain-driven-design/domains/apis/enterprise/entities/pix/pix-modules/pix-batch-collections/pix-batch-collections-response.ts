import dayjs from 'dayjs'

import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import { TxId } from '../../value-objects/tx-id'
import { PixBatchCollectionsBatchResponseType } from './@interfaces-pix-batch-collections'
import { Status } from './@types-pix-batch-collections'

export class PixBatchCollectionsCobv extends ApiResponse {
  #props: {
    criacao?: Date
    txid: TxId
    status: Status
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
      violacoes: {
        razao: string
        propriedade: string
      }[]
    }
  }

  constructor(props: PixBatchCollectionsBatchResponseType['cobsv'][0]) {
    super()
    this.#props = {
      criacao: props.criacao ? new Date(props.criacao) : undefined,
      txid: new TxId(props.txid),
      problema: props.problema
        ? {
            type: props.problema.type,
            title: props.problema.title,
            status: props.problema.status,
            detail: props.problema.detail,
            violacoes: props.problema.violacoes.map((violation) => {
              return {
                razao: violation.razao,
                propriedade: violation.propriedade,
              }
            }),
          }
        : undefined,
      status: props.status,
    }
  }

  /**
   * Data de criação da cobrança com vencimento
   *
   * ISO String no formato `{year}-{month}-{day}T{hour}:{minute}:{seconds}.{milliseconds}Z`
   */
  get criacao() {
    return dayjs(this.#props.criacao)
  }

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
  get txid() {
    return this.#props.txid
  }

  /**
   * Esta propriedade se apresenta apenas quando há uma rejeição durante a criação da cobrança
   */
  get problema() {
    return this.#props.problema
  }

  get status() {
    return this.#props.status
  }

  toObject() {
    return {
      criacao: this.criacao.toDate(),
      txid: this.txid.value,
      problema: this.problema,
      status: this.status,
    }
  }
}

export class PixBatchCollectionsResponse extends ApiResponse {
  #props: {
    descricao: string
    criacao: Date
    cobsv: PixBatchCollectionsCobv[]
  }

  constructor(props: PixBatchCollectionsBatchResponseType) {
    super()
    this.#props = {
      descricao: props.descricao,
      criacao: new Date(props.criacao),
      cobsv: props.cobsv.map((item) => new PixBatchCollectionsCobv(item)),
    }
  }

  get descricao() {
    return this.#props.descricao
  }

  /**
   * Data de criação do Lote de Cobrança
   *
   * Objeto `dayjs`
   */
  get criacao() {
    return dayjs(this.#props.criacao)
  }

  get cobsv() {
    return this.#props.cobsv
  }

  toObject() {
    return {
      descricao: this.descricao,
      criacao: this.criacao.toDate(),
      cobsv: this.cobsv.map((item) => item.toObject()),
    }
  }
}
