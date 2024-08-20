import { MonetaryValue } from '@apisEnterprise/entities/value-objects/monetary-value'
import { PixDueChargeResponseType } from '@pixEnterprise/pix-modules/pix-due-charge/@interfaces-pix-due-charge'

/**
 * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
 */
type PixDueChargeResponseTypeValor = PixDueChargeResponseType['valor']

export interface PixDueChargeValueContractProps
  extends PixDueChargeResponseTypeValor {}

export abstract class PixDueChargeValueContract {
  #props: {
    /**
     * Valor original da cobrança.string `\d{1,10}\ .\d{2}`
     */
    original: MonetaryValue
    /**
     * Multa aplicada à cobrança. `object`
     */
    multa: PixDueChargeResponseTypeValor['multa']
    /**
     * Juros aplicado à cobrança. `object`
     */
    juros: PixDueChargeResponseTypeValor['juros']
    /**
     * Abatimento aplicado à cobrança. `object`
     */
    abatimento: PixDueChargeResponseTypeValor['abatimento']
    /**
     * Descontos aplicados à cobrança. `object`
     */
    desconto: PixDueChargeResponseTypeValor['desconto']
  }

  constructor(props: PixDueChargeValueContractProps) {
    this.#props = {
      original: new MonetaryValue(props.original),
      multa: props.multa,
      juros: props.juros,
      abatimento: props.abatimento,
      desconto: props.desconto,
    }
  }

  /**
   * Detalhes sobre a transação
   */
  protected get props() {
    return {
      /**
       * Valor original da cobrança.string `\d{1,10}\ .\d{2}`
       */
      original: this.#props.original,
      /**
       * Multa aplicada à cobrança. `object`
       */
      multa: this.#props.multa,
      /**
       * Juros aplicado à cobrança. `object`
       */
      juros: this.#props.juros,
      /**
       * Abatimento aplicado à cobrança. `object`
       */
      abatimento: this.#props.abatimento,
      /**
       * Descontos aplicados à cobrança. `object`
       */
      desconto: this.#props.desconto,
    }
  }
}
