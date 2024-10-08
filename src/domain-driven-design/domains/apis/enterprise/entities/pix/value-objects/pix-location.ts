import dayjs from 'dayjs'

import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import { Loc } from '../pix-modules/@types-common'
import { TxId } from './tx-id'

export type TipoCob<type extends 'cob' | 'cobv' | undefined = undefined> =
  type extends undefined
    ? 'cob' | 'cobv'
    : type extends 'cob'
      ? 'cob'
      : type extends 'cobv'
        ? 'cobv'
        : never

export interface PixLocationProps<
  type extends 'cob' | 'cobv' | undefined = undefined,
> extends Loc<type> {}

/**
 * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
 */
export class PixLocation<
  type extends 'cob' | 'cobv' | undefined = undefined,
> extends ApiResponse {
  #props: {
    id: number
    /**
     * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
     */
    location: string
    tipoCob: TipoCob<type>
    criacao?: Date
    txid?: TxId
  }

  constructor({
    id,
    location,
    tipoCob,
    criacao,
    txid,
  }: PixLocationProps<type>) {
    super()
    this.#props = {
      id,
      location,
      tipoCob,
      criacao: criacao ? new Date() : undefined,
      txid: txid ? new TxId(txid) : undefined,
    }
  }

  get id() {
    return this.#props.id
  }

  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  get location() {
    return this.#props.location
  }

  get tipoCob() {
    return this.#props.tipoCob
  }

  get criacao() {
    return this.#props.criacao ? dayjs(this.#props.criacao) : undefined
  }

  toObject() {
    return {
      id: this.id,
      /**
       * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
       */
      location: this.location,
      tipoCob: this.tipoCob,
      criacao: this.criacao?.toDate(),
    }
  }
}
