import { Cep } from './cep'
import { State, StatesShort } from './state'

export type AddressRaw = {
  cep: string
  number: string
  street: string
  neighborhood: string
  complement: string
  city: string
  state: StatesShort
}

interface AddressProps {
  cep: string
  number: string
  street: string
  neighborhood: string
  complement: string
  city: string
  state: StatesShort
}

export class Address {
  #props: {
    cep: Cep
    number: string
    street: string
    neighborhood: string
    complement: string
    city: string
    state: State
  }

  constructor({
    cep,
    number,
    street,
    neighborhood,
    complement,
    city,
    state,
  }: AddressProps) {
    this.#props = {
      cep: new Cep(cep),
      number,
      street,
      neighborhood,
      complement,
      city,
      state: new State(state),
    }
  }

  get cep() {
    return new Cep(this.#props.cep.value)
  }

  get number() {
    return this.#props.number
  }

  get street() {
    return this.#props.street
  }

  get neighborhood() {
    return this.#props.neighborhood
  }

  get complement() {
    return this.#props.complement
  }

  get city() {
    return this.#props.city
  }

  get state() {
    return new State(this.#props.state.short)
  }

  toObject() {
    return <AddressRaw>{
      cep: this.cep.format(),
      number: this.number,
      street: this.street,
      neighborhood: this.neighborhood,
      complement: this.complement,
      city: this.city,
      state: this.state.short,
    }
  }

  get plainText() {
    const raw = this.toObject()
    return `${raw.street}, ${raw.number}, ${raw.neighborhood}, ${raw.city}-${raw.state}`
  }

  compareData(address: Address) {
    const cepEqual = this.cep.compareData(address.cep)
    const numberEqual = this.number === address.number
    const streetEqual = this.street === address.street
    const neighborhoodEqual = this.neighborhood === address.neighborhood
    const complementEqual = this.complement === address.complement
    const cityEqual = this.city === address.city
    const stateEqual = this.state.compareData(address.state)

    const addressEqual =
      cepEqual &&
      numberEqual &&
      streetEqual &&
      neighborhoodEqual &&
      complementEqual &&
      cityEqual &&
      stateEqual

    return addressEqual
  }
}
