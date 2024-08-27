// import axios from 'axios'

import { MonetaryValue } from './exports.classes'

// import EfiPay from '.'
// import { env } from './env'

// EfiPay.generateBase64FromCertificate({
//   certificadoHomologacaoPath: env.CERTIFICADO_HOMOLOGACAO_PATH,
// })

// EfiPay.generateDotEnv({
//   variables: {
//     CLIENT_ID_HOMOLOGACAO: 'meu client id de Homologação',
//     CLIENT_ID_PRODUCAO: 'meu client id de Produção',
//     CLIENT_SECRET_HOMOLOGACAO: 'meu client secret de Homologação',
//     CLIENT_SECRET_PRODUCAO: 'meu client secret de Produção',
//     PIX_KEY: 'minha chave pix',
//     WEBHOOK_PIX: 'minha url de webhook pix',
//   },
//   mode: 'overwrite',
// })

// async function getBufferFromCertificate() {
//   const urlHomologacao = `your-certificate-download-url`
//   const urlProducao = `your-certificate-download-url`

//   const { data: dataHomologacao } = await axios.get(urlHomologacao, {
//     responseType: 'blob',
//   })

//   const { data: dataProducao } = await axios.get(urlProducao, {
//     responseType: 'blob',
//   })

//   const certificates = {
//     homologacaoBuffer: Buffer.from(await dataHomologacao.arrayBuffer()),
//     producaoBuffer: Buffer.from(await dataProducao.arrayBuffer()),
//   }

//   EfiPay.generateBase64FromBufferCertificate({
//     certificadoHomologacaoBuffer: certificates.homologacaoBuffer,
//     certificadoProducaoBuffer: certificates.producaoBuffer,
//   })
// }

// const efi = new EfiPay('SANDBOX', {
//   client_id: 'meu_client_id',
//   client_secret: 'meu_client_secret',
//   certificate: buffer,
//   certificateType: 'buffer',
//   validateMtls: false,
// })

// // const efi = new EfiPay('SANDBOX', {
// //   client_id: 'meu_client_id',
// //   client_secret: 'meu_client_secret',
// //   certificate: 'certificado em "base64"',
// //   certificateType: 'base64',
// // })

const value = new MonetaryValue('R$ 50,00')

console.log('value:', value.toObject())
