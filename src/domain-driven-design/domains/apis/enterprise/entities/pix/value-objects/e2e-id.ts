import { Id } from './id'

/**
 * Determina o identificador da transação.
 *
 * - string (Id da Transação) `^[a-zA-Z0-9]{1,35}$`
 */
export class E2eId extends Id {
  constructor(id?: string) {
    super({ size: 35, value: id })
  }

  generate() {
    return this.generateNew()
  }
}
