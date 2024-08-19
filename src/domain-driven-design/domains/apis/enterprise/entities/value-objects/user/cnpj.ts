import { mask } from 'remask'

export class Cnpj {
  #value: string
  constructor(data: string) {
    const cnpj = data.replaceAll(/[^0-9]+/gi, '')
    this.#value = cnpj
  }

  get value() {
    return this.#value
  }

  isValid() {
    const calculaDigitoCNPJ = (cnpj: string, pesoInicial: number) => {
      const arrNum = cnpj.split('').map(Number)
      let peso = pesoInicial

      const soma = arrNum.reduce((acc, curr) => {
        acc += curr * peso
        peso = peso === 2 ? 9 : peso - 1
        return acc
      }, 0)

      const resto = soma % 11
      return resto < 2 ? 0 : 11 - resto
    }

    const criaDigitosCNPJ = (cnpj: string) => {
      const cnpjBase = cnpj.slice(0, 12)
      const digito1 = calculaDigitoCNPJ(cnpjBase, 5)
      const digito2 = calculaDigitoCNPJ(cnpjBase + digito1, 6)
      return cnpjBase + digito1 + digito2
    }

    const validaCNPJ = (text: string) => {
      const cnpjClear = text.replace(/[^0-9]+/g, '')
      if (cnpjClear.length !== 14 || /^(\d)\1{13}$/.test(cnpjClear))
        return false
      return criaDigitosCNPJ(cnpjClear) === cnpjClear
    }

    return validaCNPJ(this.value)
  }

  format() {
    return mask(this.value, ['99.999.999/9999-99'])
  }
}
