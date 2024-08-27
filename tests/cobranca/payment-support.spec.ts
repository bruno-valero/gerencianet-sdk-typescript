// import { CobrancaRequest } from '@/domain-driven-design/domains/apis/enterprise/entities/cobranca/cobranca'
// import { CardPaymentSupport } from '@/domain-driven-design/domains/apis/enterprise/entities/cobranca/cobranca-modules/card/payment-support'
// import { env } from '@/env'

// describe('Cobrança Cartão - Payment Support', () => {
//   let cobranca: CobrancaRequest<'SANDBOX'>
//   let sut: CardPaymentSupport<'SANDBOX'>

//   beforeAll(() => {
//     cobranca = new CobrancaRequest({
//       type: 'SANDBOX',
//       options: {
//         client_id: env.CLIENT_ID_HOMOLOGACAO ?? '',
//         client_secret: env.CLIENT_SECRET_HOMOLOGACAO ?? '',
//         certificate: env.CERTIFICADO_HOMOLOGACAO_BASE64,
//         certificateType: 'base64',
//       },
//     })
//     sut = cobranca.card.paymentSupport
//   })

//   it('should be able to identify a card brand', async () => {
//     const resp = await sut.identifyBrand({
//       cardNumber: '4485785674290087',
//     })

//     console.log('identifyBrand resp:', resp)
//     expect(resp).not.toBeNull()
//     // expect(resp).toBeInstanceOf(PixImediateChargeResponse)
//   })
// })
