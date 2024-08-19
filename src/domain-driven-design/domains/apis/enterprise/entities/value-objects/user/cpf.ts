import { mask } from 'remask'

export class Cpf {
  #value: string
  constructor(data: string) {
    const cpf = data.replaceAll(/[^0-9]+/gi, '')
    this.#value = cpf
  }

  get value() {
    return this.#value
  }

  isValid() {
    const criaDigitos: (num: string) => string = (num: string) => {
      const arrNum = num.split('')
      const length = arrNum.length

      const digito = arrNum
        .map((letter, index) => {
          const number = Number(letter)
          return number * (length + 1 - index)
        })
        .reduce((acc, num) => acc + num, 0)

      const digitoCalc1 = 11 - (digito % 11)
      const digitoCalc2 = digitoCalc1 > 9 ? '0' : String(digitoCalc1)

      if (arrNum.length === 11) {
        const result = arrNum.join('')
        return result
      }
      const arrNum2 = [...arrNum, digitoCalc2]
      const result = arrNum2.join('')

      return criaDigitos(result)
    }

    const validaCPF = (text: string) => {
      if (!text) return false
      const cpfClear = text.replaceAll(/[^0-9]+/g, '')
      if (cpfClear.length !== 11) return false
      if (cpfClear[0].repeat(cpfClear.length) === cpfClear) return false

      const cpfArray = cpfClear.split('') as string[]
      const cpfToNumber = cpfArray.map(Number)

      const cpfJoined = cpfToNumber.join('')
      const parte1 = cpfJoined.slice(0, -2)
      const cpfValido = criaDigitos(parte1)

      const cpf = cpfJoined
      return cpf === cpfValido
    }

    return validaCPF(this.value)
  }

  format() {
    return mask(this.value, ['999.999.999-99'])
  }
}
