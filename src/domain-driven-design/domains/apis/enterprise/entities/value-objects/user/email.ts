import z from 'zod'

export class Email {
  #value: string
  constructor(data: string) {
    const email = data.replaceAll(/[^0-9]+/gi, '')
    this.#value = email
  }

  get value() {
    return this.#value
  }

  isValid() {
    const isEmail = z.string().email().safeParse(this.value).success

    return isEmail
  }
}
