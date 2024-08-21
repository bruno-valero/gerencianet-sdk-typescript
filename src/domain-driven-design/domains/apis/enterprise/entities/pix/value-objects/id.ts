import UniqueEntityId from '@/domain-driven-design/core/entities/unique-entity-id'

interface IdProp {
  size: number
  value?: string
}

export class Id {
  #value: string
  #size: number
  constructor({ size, value }: IdProp) {
    this.#size = size
    if (value) {
      this.#value = value
    } else {
      this.#value = this.generateNew(size)
    }
  }

  get value() {
    return this.#value
  }

  protected generateNew(size?: number) {
    size = size || this.#size

    function getOnlyAlphaNumeric(str: string) {
      return str.replaceAll(/[^0-9a-z]/gi, '')
    }

    let id = getOnlyAlphaNumeric(new UniqueEntityId().value)

    while (id.length < size) {
      id += getOnlyAlphaNumeric(new UniqueEntityId().value)
    }
    const data = id.slice(0, size)
    return data
  }
}
