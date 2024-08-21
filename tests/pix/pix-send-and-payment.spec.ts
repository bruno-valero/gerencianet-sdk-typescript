import { PixRequest } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix'
import { PixSendAndPayment } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-send-and-payment'
import { IdEnvio } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/value-objects/id-envio'
import { env } from '@/env'

describe.skip('Pix Send and Payment', () => {
  let pix: PixRequest<'SANDBOX'>
  let sut: PixSendAndPayment<'SANDBOX'>

  beforeAll(() => {
    pix = new PixRequest({
      type: 'SANDBOX',
      options: {
        client_id: env.CLIENT_ID_HOMOLOGACAO,
        client_secret: env.CLIENT_SECRET_HOMOLOGACAO,
        certificate: env.CERTIFICADO_HOMOLOGACAO_PATH,
      },
    })
    sut = pix.sendAndPayment
  })
  it('should be able to send a pix', async () => {
    const secondKey = process.env.PIX_KEY_SECOND

    if (!secondKey) {
      console.log('invalid secondary pix key')
      return
    }
    const resp = await sut.send({
      idEnvio: new IdEnvio().value,
      body: {
        valor: '15.00',
        pagador: { chave: env.PIX_KEY },
        favorecido: { chave: secondKey },
      },
    })

    console.log('resp:', resp?.props)
  })
})
