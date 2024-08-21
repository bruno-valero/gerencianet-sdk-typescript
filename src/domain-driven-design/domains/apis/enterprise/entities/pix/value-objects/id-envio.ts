import UniqueEntityId from '@/domain-driven-design/core/entities/unique-entity-id'

/**
 * Determina o identificador da transação.
 *
 * - string (Id da Transação) `^[a-zA-Z0-9]{1,35}$`
 */
export class IdEnvio {
  #value: string
  constructor(id?: string) {
    this.#value = this.generate(id)
  }

  get value() {
    return this.#value
  }

  generate(id?: string) {
    const uuid1 = new UniqueEntityId(id)
    const uuid2 = new UniqueEntityId(id)
    const id1 = uuid1.value.replaceAll(/[^0-9a-z]/gi, '')
    const id2 = uuid2.value.replaceAll(/[^0-9a-z]/gi, '')

    const idEnvio = `${id1}${id2}`.slice(0, 35)
    return idEnvio
  }
}
