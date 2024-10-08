export type FormatLocales =
  | 'af-ZA'
  | 'ar-SA'
  | 'ar-EG'
  | 'bg-BG'
  | 'ca-ES'
  | 'zh-CN'
  | 'zh-TW'
  | 'hr-HR'
  | 'cs-CZ'
  | 'da-DK'
  | 'nl-NL'
  | 'en-US'
  | 'en-GB'
  | 'et-EE'
  | 'fi-FI'
  | 'fr-FR'
  | 'de-DE'
  | 'el-GR'
  | 'he-IL'
  | 'hi-IN'
  | 'hu-HU'
  | 'id-ID'
  | 'it-IT'
  | 'ja-JP'
  | 'ko-KR'
  | 'lv-LV'
  | 'lt-LT'
  | 'ms-MY'
  | 'nb-NO'
  | 'pl-PL'
  | 'pt-BR'
  | 'pt-PT'
  | 'ro-RO'
  | 'ru-RU'
  | 'sr-RS'
  | 'sk-SK'
  | 'sl-SI'
  | 'es-ES'
  | 'sv-SE'
  | 'th-TH'
  | 'tr-TR'
  | 'uk-UA'
  | 'vi-VN'

export type FormatCurrencies =
  | 'AED'
  | 'AFN'
  | 'ALL'
  | 'AMD'
  | 'ANG'
  | 'AOA'
  | 'ARS'
  | 'AUD'
  | 'AWG'
  | 'AZN'
  | 'BAM'
  | 'BBD'
  | 'BDT'
  | 'BGN'
  | 'BHD'
  | 'BIF'
  | 'BMD'
  | 'BND'
  | 'BOB'
  | 'BRL'
  | 'BSD'
  | 'BTN'
  | 'BWP'
  | 'BYN'
  | 'BYR'
  | 'BZD'
  | 'CAD'
  | 'CDF'
  | 'CHF'
  | 'CLF'
  | 'CLP'
  | 'CNY'
  | 'COP'
  | 'CRC'
  | 'CUC'
  | 'CUP'
  | 'CVE'
  | 'CZK'
  | 'DJF'
  | 'DKK'
  | 'DOP'
  | 'DZD'
  | 'EGP'
  | 'ERN'
  | 'ETB'
  | 'EUR'
  | 'FJD'
  | 'FKP'
  | 'FOK'
  | 'GBP'
  | 'GEL'
  | 'GGP'
  | 'GHS'
  | 'GIP'
  | 'GMD'
  | 'GNF'
  | 'GTQ'
  | 'GYD'
  | 'HKD'
  | 'HNL'
  | 'HRK'
  | 'HTG'
  | 'HUF'
  | 'IDR'
  | 'ILS'
  | 'IMP'
  | 'INR'
  | 'IQD'
  | 'IRR'
  | 'ISK'
  | 'JEP'
  | 'JMD'
  | 'JOD'
  | 'JPY'
  | 'KES'
  | 'KGS'
  | 'KHR'
  | 'KID'
  | 'KMF'
  | 'KRW'
  | 'KWD'
  | 'KYD'
  | 'KZT'
  | 'LAK'
  | 'LBP'
  | 'LKR'
  | 'LRD'
  | 'LSL'
  | 'LYD'
  | 'MAD'
  | 'MDL'
  | 'MGA'
  | 'MKD'
  | 'MMK'
  | 'MNT'
  | 'MOP'
  | 'MRU'
  | 'MUR'
  | 'MVR'
  | 'MWK'
  | 'MXN'
  | 'MYR'
  | 'MZN'
  | 'NAD'
  | 'NGN'
  | 'NIO'
  | 'NOK'
  | 'NPR'
  | 'NZD'
  | 'OMR'
  | 'PAB'
  | 'PEN'
  | 'PGK'
  | 'PHP'
  | 'PKR'
  | 'PLN'
  | 'PYG'
  | 'QAR'
  | 'RON'
  | 'RSD'
  | 'RUB'
  | 'RWF'
  | 'SAR'
  | 'SBD'
  | 'SCR'
  | 'SDG'
  | 'SEK'
  | 'SGD'
  | 'SHP'
  | 'SLE'
  | 'SLL'
  | 'SOS'
  | 'SRD'
  | 'SSP'
  | 'STD'
  | 'STN'
  | 'SVC'
  | 'SYP'
  | 'SZL'
  | 'THB'
  | 'TJS'
  | 'TMT'
  | 'TND'
  | 'TOP'
  | 'TRY'
  | 'TTD'
  | 'TVD'
  | 'TWD'
  | 'TZS'
  | 'UAH'
  | 'UGX'
  | 'USD'
  | 'UYU'
  | 'UZS'
  | 'VES'
  | 'VND'
  | 'VUV'
  | 'WST'
  | 'XAF'
  | 'XCD'
  | 'XDR'
  | 'XOF'
  | 'XPF'
  | 'YER'
  | 'ZAR'
  | 'ZMW'
  | 'ZWL'

export interface MonetaryValueFormatProps {
  /**
   * Determina para qual localização o valor será traduzido
   */
  locale: FormatLocales
  /**
   * Determina a Moeda a qual o valor será formatado
   */
  currency: FormatCurrencies
}

export interface MonetaryValueToObjectProps {
  formatProps?: Partial<MonetaryValueFormatProps>
}

/**
 *
 * ---
 *
 * Converte Números em valores monetários.
 *
 * ---
 *
 * Exemplo:
 *
 * ```ts
 * import { MonetaryValue } from "@bruno-valero/gerencianet-sdk-typescript"
 *
 * // exemplo 1
 * const exemplo1 = new MonetaryValue('R$ 289,90')
 *
 * // exemplo 2
 * const exemplo2 = new MonetaryValue('289,90')
 *
 * // exemplo 3
 * const exemplo3 = new MonetaryValue('289.90')
 *
 * // exemplo 4
 * const exemplo4 = new MonetaryValue(289.90)
 * ```
 *
 * ---
 *
 * ### Formatar para diferentes Moedas
 *
 * ```ts
 * const value = new MonetaryValue(289.90)
 *
 * value.format({ currency: 'USD', locale: 'pt-BR' })
 * ```
 *
 * ---
 *
 *
 */
export class MonetaryValue {
  #valueInCents: number

  constructor(value: number | string) {
    const valueString = String(value)
    const onlyNumberAttributes = valueString.replaceAll(/([^0-9.,]+)/gi, '')

    const getNumberSymbols = (number: string) => {
      const symbols = {
        thousands: '',
        decimal: '',
      }
      number.split('').forEach((char) => {
        const isSymbol = [',', '.'].includes(char)
        if (!isSymbol) return
        if (!symbols.thousands) {
          symbols.thousands = char
        } else if (symbols.thousands !== char && !symbols.decimal) {
          symbols.decimal = char
        }
      })

      let response: typeof symbols

      if (!symbols.decimal && symbols.thousands) {
        response = { decimal: symbols.thousands, thousands: '' }
      } else {
        response = { ...symbols }
      }

      return response
    }

    const getNumberInCents = (
      number: string,
      symbols: ReturnType<typeof getNumberSymbols>,
    ) => {
      if (!symbols.decimal && !symbols.thousands) {
        return Number(number)
      } else {
        const valueNumber = Number(
          onlyNumberAttributes
            .replaceAll(symbols.thousands, '')
            .replace(symbols.decimal, '.'),
        )

        const valueRounded = Number(valueNumber.toFixed(2))

        const valueInCents = valueRounded * 100

        return valueInCents
      }
    }

    const symbols = getNumberSymbols(onlyNumberAttributes)

    const numberInCents = getNumberInCents(onlyNumberAttributes, symbols)

    this.#valueInCents = numberInCents
  }

  /**
   *
   * ---
   *
   * Retorna o valor monetário em centavos.
   *
   * Exemplo: `2.00 --> 200`
   *
   * ---
   *
   *
   */
  get cents() {
    return this.#valueInCents
  }

  /**
   *
   * ---
   *
   * Retorna o valor monetário em unidades com duas casas decimais.
   *
   * Exemplo: `2.4184315841 --> 2.42`
   *
   * ---
   *
   *
   */
  get units() {
    return this.cents / 100
  }

  /**
   * Valor original da cobrança com os centavos separados por ".", exemplo: "10.00"
   */
  get originalValue() {
    return this.units.toFixed(2)
  }

  protected getFormatParameters(props?: Partial<MonetaryValueFormatProps>) {
    const locale: FormatLocales = props?.locale ?? 'pt-BR'
    const currency: FormatCurrencies = props?.currency ?? 'BRL'

    return { locale, currency }
  }

  /**
   *
   * ---
   *
   * Formata o valor monetário para a moeda e localização escolhida.
   *
   * ---
   *
   * ### Atenção!
   *
   * **Não realiza conversão de moedas**, apenas formata o valor.
   *
   * ---
   *
   * @param MonetaryValueFormatProps
   * @returns `string`
   */
  format(props?: Partial<MonetaryValueFormatProps>) {
    const { currency, locale } = this.getFormatParameters(props)

    return Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(this.units)
  }

  /**
   *
   * ---
   *
   * Transforma a classe em um objeto Literal que pode ser serializado
   *
   * ---
   *
   */
  toObject(props?: MonetaryValueToObjectProps) {
    const formatProps = props?.formatProps

    const format = this.format(formatProps)

    return {
      cents: this.cents,
      units: this.units,
      /**
       * Valor original da cobrança com os centavos separados por ".", exemplo: "10.00"
       */
      originalValue: this.originalValue,
      format,
    }
  }
}
