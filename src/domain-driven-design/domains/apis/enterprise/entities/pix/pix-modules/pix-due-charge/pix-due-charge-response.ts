import { UserAccount } from '../../../user-account'
import { MonetaryValueToObjectProps } from '../../../value-objects/monetary-value'
import { CalendarDueCharge } from '../../value-objects/calendar-due-charge-response'
import { PixLocation } from '../../value-objects/pix-location'
import { TxId } from '../../value-objects/tx-id'
import { Status } from '../@types-common'
import { PixDueChargeResponseType } from './@interfaces-pix-due-charge'
import { PixDueChargeValue } from './value-objects/pix-due-charge-value'

export class PixDueChargeResponse {
  #props: {
    calendario: CalendarDueCharge
    /**
     * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
     *
     * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
     * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
     */
    txid: TxId
    revisao: number
    loc: PixLocation<'cobv'>
    /**
     * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
     */
    location: string
    status: Status
    devedor: UserAccount
    recebedor: UserAccount
    valor: PixDueChargeValue
    chave: string
    solicitacaoPagador: string
    pixCopiaECola: string
  }

  constructor(props: PixDueChargeResponseType) {
    this.#props = {
      calendario: new CalendarDueCharge({
        criacao: props.calendario.criacao,
        dataDeVencimento: props.calendario.dataDeVencimento,
        validadeAposVencimento: props.calendario.validadeAposVencimento,
      }),
      txid: new TxId(props.txid),
      revisao: props.revisao,
      loc: new PixLocation({
        id: props.loc.id,
        location: props.loc.location,
        tipoCob: props.loc.tipoCob,
      }),
      location: props.location,
      status: props.status,
      devedor: new UserAccount({
        clienteFinal: {
          nomeCompleto: props.devedor.nome,
          cpf: props.devedor.cpf,
          cnpj: props.devedor.cnpj,
          email: props.devedor.email,
          endereco: {
            bairro: '',
            numero: '',
            complemento: '',
            cep: props.devedor.cep,
            cidade: props.devedor.cidade,
            estado: props.devedor.uf,
            logradouro: props.devedor.logradouro,
          },
        },
      }),
      recebedor: new UserAccount({
        clienteFinal: {
          nomeCompleto: props.recebedor.nome,
          cpf: props.recebedor.cpf,
          cnpj: props.recebedor.cnpj,
          email: props.recebedor.email,
          endereco: {
            bairro: '',
            numero: '',
            complemento: '',
            cep: props.recebedor.cep,
            cidade: props.recebedor.cidade,
            estado: props.recebedor.uf,
            logradouro: props.recebedor.logradouro,
          },
        },
      }),
      valor: new PixDueChargeValue(props.valor),
      chave: props.chave,
      solicitacaoPagador: props.solicitacaoPagador,
      pixCopiaECola: props.pixCopiaECola,
    }
  }

  get calendario() {
    return this.#props.calendario
  }

  get txid() {
    return this.#props.txid
  }

  get revisao() {
    return this.#props.revisao
  }

  get loc() {
    return this.#props.loc
  }

  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  get location() {
    return this.#props.location
  }

  get status() {
    return this.#props.status
  }

  get devedor() {
    return this.#props.devedor
  }

  get valor() {
    return this.#props.valor
  }

  get chave() {
    return this.#props.chave
  }

  get solicitacaoPagador() {
    return this.#props.solicitacaoPagador
  }

  get pixCopiaECola() {
    return this.#props.pixCopiaECola
  }

  toObject(props?: {
    valueFormat?: MonetaryValueToObjectProps['formatProps']
  }) {
    const formatProps = props?.valueFormat

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
      valor: this.valor.toObject({ formatProps }),
      chave: this.chave,
      solicitacaoPagador: this.solicitacaoPagador,
      pixCopiaECola: this.pixCopiaECola,
    }
  }
}
