import { mask } from 'remask'

export class Cep {
  #value: string
  constructor(cep: string) {
    const cepRaw = cep.replaceAll(/[^0-9]+/gi, '')
    this.#value = cepRaw
  }

  get value() {
    return this.#value
  }

  isValid() {
    const cepRaw = this.value
    const cepLength = cepRaw.length
    const correctLength = '00000000'.length

    return cepLength === correctLength
  }

  format() {
    return mask(this.value, '99999-999')
  }

  compareData(cep: Cep) {
    return this.value === cep.value
  }
}
