import dayjs from 'dayjs'

interface CalendarImediateChargeProps {
  criacao: string
  expiracao: number
}

export class CalendarImediateCharge {
  #props: {
    criacao: Date
    expiracao: number
  }

  constructor({ criacao, expiracao }: CalendarImediateChargeProps) {
    this.#props = {
      criacao: new Date(criacao),
      expiracao,
    }
  }

  get criacao() {
    return dayjs(this.#props.criacao)
  }

  get expiracao() {
    return this.#props.expiracao
  }

  getExpirationDate() {
    const date = this.criacao

    return date.add(this.expiracao, 'second')
  }

  toObject() {
    return {
      criacao: this.criacao.toDate(),
      expiracao: this.expiracao,
    }
  }
}
