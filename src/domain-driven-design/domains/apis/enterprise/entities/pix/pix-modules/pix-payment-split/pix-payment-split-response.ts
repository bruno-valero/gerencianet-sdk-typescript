import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import { Cnpj } from '../../../value-objects/user/cnpj'
import { Cpf } from '../../../value-objects/user/cpf'
import { Id } from '../../value-objects/id'
import { TxId } from '../../value-objects/tx-id'
import { PixPaymentSplitResponseType } from './@interfaces-pix-payment-split'
import { Tipo } from './@types-pix-payment-split'

type ResponseSplit = {
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
  valor: string
}

type ResponseFavorecido =
  | {
      /**
       * CPF do favorecido.string `/^\d{11}$/`
       */
      cpf: Cpf
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
      cnpj: Cnpj
      /**
       * CPF do favorecido.string `/^\d{11}$/`
       */
      cpf?: undefined
      /**
       * Número da conta do favorecido (incluindo digito final, sem o hífen).
       */
      conta: string
    }

export class PixPaymentSplitResponse extends ApiResponse {
  #props: {
    id: Id
    descricao: string
    txid?: TxId
    lancamento: {
      imediato: boolean
    }
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
      minhaParte: ResponseSplit
      repasses: (ResponseSplit & {
        favorecido: ResponseFavorecido
      })[]
    }
  }

  constructor(props: PixPaymentSplitResponseType) {
    super()
    this.#props = {
      id: new Id({ size: 35, value: props.id }),
      descricao: props.descricao,
      txid: props.txid ? new TxId(props.txid) : undefined,
      lancamento: props.lancamento,
      split: {
        divisaoTarifa: props.split.divisaoTarifa,

        minhaParte: {
          tipo: props.split.minhaParte.tipo,
          valor: props.split.minhaParte.valor,
        },
        repasses: props.split.repasses.map((item) => ({
          tipo: item.tipo,
          valor: item.valor,
          favorecido: item.favorecido.cpf
            ? {
                cpf: new Cpf(item.favorecido.cpf),
                conta: item.favorecido.conta,
              }
            : {
                cnpj: new Cnpj(item.favorecido.cnpj!),
                conta: item.favorecido.conta,
              },
        })),
      },
    }
  }

  get id() {
    return this.#props.id
  }

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
  get descricao() {
    return this.#props.descricao
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
   * `Object (Lancamento)`
   */
  get lancamento() {
    return this.#props.lancamento
  }

  /**
   * `Object (Split)`
   */
  get split() {
    return this.#props.split
  }

  toObject() {
    return {
      id: this.id,
      descricao: this.descricao,
      txid: this.txid,
      lancamento: this.lancamento,
      split: {
        divisaoTarifa: this.split.divisaoTarifa,

        minhaParte: {
          tipo: this.split.minhaParte.tipo,
          valor: this.split.minhaParte.valor,
        },
        repasses: this.split.repasses.map((item) => ({
          tipo: item.tipo,
          valor: item.valor,
          favorecido: item.favorecido.cpf?.format()
            ? {
                cpf: item.favorecido.cpf,
                conta: item.favorecido.conta,
              }
            : {
                cnpj: item.favorecido.cnpj!.format(),
                conta: item.favorecido.conta,
              },
        })),
      },
    }
  }
}
