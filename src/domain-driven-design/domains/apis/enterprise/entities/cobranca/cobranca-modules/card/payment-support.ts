// import EfiPayment from 'payment-token-efi'

// import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'
// import { env } from '@/env'

// import { MonetaryValue } from '../../../value-objects/monetary-value'

// interface IdentifyBrandProps {
//   /**
//    *
//    * string ex. "4485785674290087"
//    */
//   cardNumber: string
// }
// interface ListInstallmentsProps {
//   /**
//    *
//    * Identificador de sua conta, pode ser encontrado na aba **API** de sua conta na Gerencianet. Procure por `Identificador de conta` ou `payee_code`
//    *
//    * Propriedade Opcional, caso não seja informada será usado o valor da variável de ambiente **`ACCOUNT_IDENTIFIER`**. Se também não houver a variável de ambiente, retornará nulo
//    *
//    * ---
//    *
//    * `string`
//    *
//    * ---
//    *
//    */
//   accountIdentifier?: string
//   /**
//    * Bandeira do Cartão de crédito
//    */
//   brand: string
//   /**
//    *
//    * ---
//    *
//    * Valor da transação em formato `MonetaryValue`.
//    *
//    * ---
//    *
//    * Exemplo:
//    *
//    * ```ts
//    * import { MonetaryValue } from "@bruno-valero/gerencianet-sdk-typescript"
//    *
//    * // exemplo 1
//    * const exemplo1 = new MonetaryValue('R$ 289,90')
//    *
//    * // exemplo 2
//    * const exemplo2 = new MonetaryValue('289,90')
//    *
//    * // exemplo 3
//    * const exemplo3 = new MonetaryValue('289.90')
//    *
//    * // exemplo 4
//    * const exemplo4 = new MonetaryValue(289.90)
//    * ```
//    *
//    */
//   value: MonetaryValue
// }

// interface GeneratePaymentTokenProps
//   extends Omit<ListInstallmentsProps, 'value'>,
//     IdentifyBrandProps {
//   /**
//    * CVV do Cartão.
//    *
//    * exemplo: `'123'`
//    */
//   cvv: string
//   /**
//    * Mês de expiração do Cartão
//    *
//    * Exemplo:  `"05"`
//    */
//   expirationMonth: string
//   /**
//    * Ano de expiração do Cartão
//    *
//    * Exemplo:  `"2029"`
//    */
//   expirationYear: string
//   reuse: false
// }

// export class CardPaymentSupport<type extends EnvironmentTypes> {
//   #environmentType: type

//   constructor({ environmentType }: { environmentType: type }) {
//     this.#environmentType = environmentType
//   }

//   /**
//    *
//    * Identifica a bandeira baseado no número do cartão.
//    *
//    * ---
//    *
//    * @param IdentifyBrandProps
//    * @returns `Promise<string | null>`
//    */
//   async identifyBrand({ cardNumber }: IdentifyBrandProps) {
//     try {
//       const brand =
//         await EfiPayment.CreditCard.setCardNumber(cardNumber).verifyCardBrand()

//       const response = brand || 'undefined'

//       return response as
//         | 'visa'
//         | 'mastercard'
//         | 'amex'
//         | 'elo'
//         | 'hipercard'
//         | 'undefined'
//         | 'unsupported'
//     } catch (error) {
//       if (error instanceof Error) {
//         console.log('error: ', error.message)
//       } else {
//         console.log('error: ', error)
//       }
//       return null
//     }
//   }

//   /**
//    *
//    * ---
//    *
//    * Caso a propriedade `accountIdentifier` não seja informada, será usado o valor da variável de ambiente **`"ACCOUNT_IDENTIFIER"`**. Se também não houver a variável de ambiente, retornará nulo
//    *
//    * ---
//    *
//    * @param ListInstallmentsProps
//    * @returns `Promise<EfiPayment.CreditCard.InstallmentsResponse | null>`
//    */
//   async listInstallments({
//     accountIdentifier,
//     brand,
//     value,
//   }: ListInstallmentsProps) {
//     const id = accountIdentifier || env.ACCOUNT_IDENTIFIER

//     if (!id) return null

//     try {
//       const installments = await EfiPayment.CreditCard.setAccount(id)
//         .setEnvironment(
//           this.#environmentType.toLocaleLowerCase() as 'production' | 'sandbox',
//         )
//         .setBrand(brand)
//         .setTotal(value.cents)
//         .getInstallments()

//       const success = installments as EfiPayment.CreditCard.InstallmentsResponse
//       const error = installments as EfiPayment.CreditCard.ErrorResponse

//       if (error.error_description) throw new Error(`${error.error_description}`)

//       return success
//     } catch (error) {
//       if (error instanceof Error) {
//         console.log('error:', error.message)
//       } else {
//         console.log('error:', error)
//       }
//       return null
//     }
//   }

//   /**
//    *
//    * @param GeneratePaymentTokenProps
//    * @returns `Promise<{ paymentToken: string; cardMask: string; } | null>`
//    */
//   async generatePaymentToken({
//     brand,
//     accountIdentifier,
//     cardNumber,
//     cvv,
//     expirationMonth,
//     expirationYear,
//     reuse,
//   }: GeneratePaymentTokenProps) {
//     const id = accountIdentifier || env.ACCOUNT_IDENTIFIER

//     if (!id) return null

//     try {
//       const result = await EfiPayment.CreditCard.setAccount(
//         'Identificador_de_conta_aqui',
//       )
//         .setEnvironment('production') // 'production' or 'sandbox'
//         .setCreditCardData({
//           brand,
//           number: cardNumber,
//           cvv,
//           expirationMonth,
//           expirationYear,
//           reuse,
//         })
//         .getPaymentToken()

//       const success = result as EfiPayment.CreditCard.PaymentTokenResponse
//       const error = result as EfiPayment.CreditCard.ErrorResponse

//       if (error.error_description) throw new Error(error.error_description)

//       const paymentToken = success.payment_token
//       const cardMask = success.card_mask

//       return {
//         paymentToken,
//         cardMask,
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         console.log('error:', error.message)
//       } else {
//         console.log('error:', error)
//       }
//       return null
//     }
//   }
// }
