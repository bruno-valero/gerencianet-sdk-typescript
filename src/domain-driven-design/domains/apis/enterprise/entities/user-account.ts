import dayjs from 'dayjs'

import { Address } from './value-objects/address/address'
import { StatesShort } from './value-objects/address/state'
import { Cnpj } from './value-objects/user/cnpj'
import { Cpf } from './value-objects/user/cpf'
import { Email } from './value-objects/user/email'

type MeioDeNotificacao = 'whatsapp' | 'sms'

type EscoposIntegrados =
  | 'cob.write'
  | 'cob.read'
  | 'pix.write'
  | 'pix.read'
  | 'webhook.write'
  | 'webhook.read'
  | 'payloadlocation.write'
  | 'payloadlocation.read'
  | 'gn.pix.evp.write'
  | 'gn.pix.evp.read'
  | 'gn.balance.read'
  | 'gn.settings.write'
  | 'gn.settings.read'
  | 'gn.opb.participants.read'
  | 'gn.opb.payment.pix.send'
  | 'gn.opb.payment.pix.read'
  | 'gn.opb.payment.pix.refund'
  | 'gn.opb.payment.pix.cancel'
  | 'gn.opb.config.write'
  | 'gn.opb.config.rea'

interface UserAccountProps {
  clienteFinal: {
    cpf?: string
    nomeCompleto: string
    dataNascimento?: `${number}/${number}/${number}`
    nomeMae?: string
    celular?: string
    email?: string
    cnpj?: string
    razaoSocial?: string
    endereco?: {
      cep: string
      estado: StatesShort
      cidade: string
      bairro: string
      logradouro: string
      numero: string
      complemento: string
    }
  }
  meioDeNotificacao?: MeioDeNotificacao[]
  escoposIntegrados?: EscoposIntegrados[]
}

export class UserAccount {
  #props: {
    clienteFinal: {
      cpf?: Cpf
      nomeCompleto: string
      dataNascimento?: Date
      nomeMae?: string
      celular?: string
      email?: Email
      razaoSocial?: string
      cnpj?: Cnpj
      endereco?: Address
    }
    meioDeNotificacao?: MeioDeNotificacao[]
    escoposIntegrados?: EscoposIntegrados[]
  }

  constructor(props: UserAccountProps) {
    const birthDate = props.clienteFinal.dataNascimento?.split('/')
    const dataIsoString = birthDate
      ? (`${birthDate[2]}-${birthDate[1]}-${birthDate[0]}T12:00:00` as const)
      : undefined
    this.#props = {
      clienteFinal: {
        cpf: props.clienteFinal.cpf
          ? new Cpf(props.clienteFinal.cpf)
          : undefined,
        nomeCompleto: props.clienteFinal.nomeCompleto,
        dataNascimento: dataIsoString ? new Date(dataIsoString) : undefined,
        nomeMae: props.clienteFinal.nomeMae,
        celular: props.clienteFinal.celular,
        email: props.clienteFinal.email
          ? new Email(props.clienteFinal.email)
          : undefined,
        razaoSocial: props.clienteFinal.razaoSocial,
        cnpj: props.clienteFinal.cnpj
          ? new Cnpj(props.clienteFinal.cnpj)
          : undefined,
        endereco: props.clienteFinal.endereco
          ? new Address({
              cep: props.clienteFinal.endereco.cep,
              number: props.clienteFinal.endereco.numero,
              street: props.clienteFinal.endereco.logradouro,
              neighborhood: props.clienteFinal.endereco.bairro,
              complement: props.clienteFinal.endereco.complemento,
              city: props.clienteFinal.endereco.cidade,
              state: props.clienteFinal.endereco.estado,
            })
          : undefined,
      },
      meioDeNotificacao: props.meioDeNotificacao,
      escoposIntegrados: props.escoposIntegrados,
    }
  }

  get clienteFinal() {
    return {
      ...this.#props.clienteFinal,
      dataNascimento: dayjs(this.#props.clienteFinal.dataNascimento),
    }
  }

  get meioDeNotificacao() {
    return this.#props.meioDeNotificacao
  }

  get escoposIntegrados() {
    return this.#props.escoposIntegrados
  }

  toObject() {
    const address = this.clienteFinal.endereco?.toObject()
    return {
      clienteFinal: {
        celular: this.clienteFinal
          .celular satisfies UserAccountProps['clienteFinal']['celular'],
        cpf: this.clienteFinal.cpf
          ?.value satisfies UserAccountProps['clienteFinal']['cpf'],
        dataNascimento: this.clienteFinal.dataNascimento.format(
          'DD/MM/YYYY',
        ) as `${number}/${number}/${number}` satisfies UserAccountProps['clienteFinal']['dataNascimento'],
        email: this.clienteFinal.email
          ?.value satisfies UserAccountProps['clienteFinal']['email'],
        endereco: (address
          ? {
              bairro: address.neighborhood,
              cep: address.cep,
              cidade: address.city,
              complemento: address.complement,
              estado: address.state,
              logradouro: address.street,
              numero: address.number,
            }
          : undefined) satisfies UserAccountProps['clienteFinal']['endereco'],
        nomeCompleto: this.clienteFinal
          .nomeCompleto satisfies UserAccountProps['clienteFinal']['nomeCompleto'],
        nomeMae: this.clienteFinal
          .nomeMae satisfies UserAccountProps['clienteFinal']['nomeMae'],
        cnpj: this.clienteFinal.cnpj
          ?.value satisfies UserAccountProps['clienteFinal']['cnpj'],
        razaoSocial: this.clienteFinal
          .razaoSocial satisfies UserAccountProps['clienteFinal']['razaoSocial'],
      } satisfies UserAccountProps['clienteFinal'],
      escoposIntegrados: this
        .escoposIntegrados satisfies UserAccountProps['escoposIntegrados'],
      meioDeNotificacao: this
        .meioDeNotificacao satisfies UserAccountProps['meioDeNotificacao'],
    } satisfies UserAccountProps
  }
}
