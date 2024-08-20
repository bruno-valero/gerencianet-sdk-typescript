// import { PixRequest } from '@pixEnterprise/pix'

// import { env } from '@/env'

// const pix = new PixRequest({
//   type: 'SANDBOX',
//   options: {
//     client_id: env.CLIENT_ID_HOMOLOGACAO,
//     client_secret: env.CLIENT_SECRET_HOMOLOGACAO,
//     certificate: env.CERTIFICADO_HOMOLOGACAO_PATH,
//   },
// })

// pix.imediateCharge
//   .create({
//     body: {
//       calendario: { expiracao: 3600 },
//       devedor: { cpf: '45618642883', nome: 'teste' },
//       valor: { original: '10.00' },
//       chave: env.PIX_KEY,
//       solicitacaoPagador: 'teste',
//     },
//   })
//   .then((charge) => console.log('charge:', charge?.toObject()))

// pix.dueCharge
//   .create({
//     txid: new TxId().value,
//     body: {
//       calendario: {
//         dataDeVencimento: dayjs()
//           .add(5, 'day')
//           .format('YYYY-MM-DD') as `${string}-${string}-${string}`,
//         validadeAposVencimento: 20,
//       },
//       chave: env.PIX_KEY,
//       devedor: {
//         cpf: '45618677830',
//         nome: 'bruno',
//         cep: '07402800',
//         cidade: 'aruja',
//         email: 'bruno@gmail.com',
//         logradouro: 'rua dois',
//         uf: 'SP',
//       },
//       valor: {
//         original: '15.00',
//         multa: {
//           modalidade: 2,
//           valorPerc: '15.00',
//         },
//         juros: {
//           modalidade: 2,
//           valorPerc: '15.00',
//         },
//         desconto: {
//           modalidade: 2,
//           descontoDataFixa: [
//             {
//               data: dayjs()
//                 .add(1, 'day')
//                 .format('YYYY-MM-DD') as `${string}-${string}-${string}`,
//               valorPerc: '10.00',
//             },
//           ],
//         },
//       },
//     },
//   })
//   .then((charge) => console.log('charge:', charge?.toObject()))
