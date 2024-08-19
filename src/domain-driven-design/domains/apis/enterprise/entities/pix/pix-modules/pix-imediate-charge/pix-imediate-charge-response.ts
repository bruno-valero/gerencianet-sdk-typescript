import { UserAccount } from '@apisEnterprise/entities/user-account'
import { MonetaryValue } from '@apisEnterprise/entities/value-objects/monetary-value'
import { CalendarImediateCharge } from '@pixEnterprise/value-objects/calendar-imediate-charge-response'
import { PixLocation } from '@pixEnterprise/value-objects/pix-location'
import { TxId } from '@pixEnterprise/value-objects/tx-id'

import { ApiResponse } from '@/domain-driven-design/core/apis/api-response'

import { Status } from '../@types-common'
import { PixImediateChargeResponseType } from './@interfaces-pix-imediate-charge'

export type PixImediateChargeResponseCreationProps =
  PixImediateChargeResponseType

export class PixImediateChargeResponse extends ApiResponse {
  protected props: {
    calendario: CalendarImediateCharge
    /**
     * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
     *
     * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
     * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
     */
    txid: TxId
    revisao: number
    loc: PixLocation<'cob'>
    /**
     * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
     */
    location: string
    status: Status
    devedor: UserAccount
    valor: MonetaryValue
    chave: string
    solicitacaoPagador: string
    pixCopiaECola: string
  }

  constructor(props: PixImediateChargeResponseCreationProps) {
    super()
    this.props = {
      calendario: new CalendarImediateCharge({
        criacao: props.calendario.criacao,
        expiracao: props.calendario.expiracao,
      }),
      /**
       * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
       *
       * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
       * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
       */
      txid: new TxId(props.txid),
      revisao: props.revisao,
      loc: new PixLocation({
        id: props.loc.id,
        /**
         * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
         */
        location: props.loc.location,
        tipoCob: props.loc.tipoCob,
      }),
      /**
       * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
       */
      location: props.location,
      status: props.status,
      devedor: new UserAccount({
        clienteFinal: {
          nomeCompleto: props.devedor.nome,
          cpf: props.devedor.cpf,
          cnpj: props.devedor.cnpj,
        },
      }),
      valor: new MonetaryValue(props.valor.original),
      chave: props.chave,
      solicitacaoPagador: props.solicitacaoPagador,
      pixCopiaECola: props.pixCopiaECola,
    }
  }

  get calendario() {
    return this.props.calendario
  }

  get txid() {
    return this.props.txid
  }

  get revisao() {
    return this.props.revisao
  }

  get loc() {
    return this.props.loc
  }

  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  get location() {
    return this.props.location
  }

  get status() {
    return this.props.status
  }

  get devedor() {
    return this.props.devedor
  }

  get valor() {
    return this.props.valor
  }

  get chave() {
    return this.props.chave
  }

  get solicitacaoPagador() {
    return this.props.solicitacaoPagador
  }

  get pixCopiaECola() {
    return this.props.pixCopiaECola
  }

  toObject(props?: {
    valueFormat?: {
      format?: Parameters<PixImediateChargeResponse['valor']['format']>[0]
      currency?: Parameters<PixImediateChargeResponse['valor']['format']>[1]
    }
  }) {
    type ToObjectParams = Parameters<
      PixImediateChargeResponse['valor']['toObject']
    >[0]

    const valueFormat = props?.valueFormat
      ? ([
          props.valueFormat.format,
          props.valueFormat.currency,
        ] satisfies ToObjectParams)
      : undefined

    return {
      calendario: this.calendario.toObject(),
      /**
       * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
       *
       * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
       * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
       */
      txid: this.txid.value,
      revisao: this.revisao,
      loc: this.loc.toObject(),
      /**
       * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
       */
      location: this.location,
      status: this.status,
      devedor: this.devedor.toObject(),
      valor: this.valor.toObject(valueFormat),
      chave: this.chave,
      solicitacaoPagador: this.solicitacaoPagador,
      pixCopiaECola: this.pixCopiaECola,
    }
  }
}
