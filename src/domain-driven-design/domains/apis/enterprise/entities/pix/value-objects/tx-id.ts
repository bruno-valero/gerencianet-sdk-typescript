import UniqueEntityId from '@/domain-driven-design/core/entities/unique-entity-id'

/**
 * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
 *
 * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
 * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
 */
export class TxId {
  #value: string
  constructor(id?: string) {
    this.#value = this.generate(id)
  }

  get value() {
    return this.#value
  }

  generate(id?: string) {
    const uuid = new UniqueEntityId(id)
    const txid = uuid.value.replaceAll(/[^0-9a-z]/gi, '')
    return txid
  }
}
