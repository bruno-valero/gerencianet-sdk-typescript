import dayjs from 'dayjs'

interface CalendarDueChargeProps {
  criacao: string
  /** data no formato `YYYY-MM-DD` */
  dataDeVencimento: `${string}-${string}-${string}`
  validadeAposVencimento: number
}

export class CalendarDueCharge {
  #props: {
    criacao: Date
    dataDeVencimento: Date
    validadeAposVencimento: number
  }

  constructor({
    criacao,
    dataDeVencimento,
    validadeAposVencimento,
  }: CalendarDueChargeProps) {
    this.#props = {
      criacao: new Date(criacao),
      dataDeVencimento: new Date(`${dataDeVencimento}T12:00:00`),
      validadeAposVencimento,
    }
  }

  get criacao() {
    return dayjs(this.#props.criacao)
  }

  get dataDeVencimento() {
    return dayjs(this.#props.dataDeVencimento)
  }

  get validadeAposVencimento() {
    return this.#props.validadeAposVencimento
  }

  /**
   *
   * @returns Retorna a `dataDeVencimento` no formato `YYYY-MM-DD`
   */
  formatDataDeVencimento() {
    return this.dataDeVencimento.format(
      'YYYY-MM-DD',
    ) as `${string}-${string}-${string}`
  }

  toObject() {
    return {
      criacao: this.criacao.toDate(),
      dataDeVencimento: this.dataDeVencimento.toDate(),
      validadeAposVencimento: this.validadeAposVencimento,
    }
  }
}
