import { PixRequest } from '@pixEnterprise/pix'

import { PixImediateCharge } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-imediate-charge'
import { PixImediateChargeResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-imediate-charge/pix-imediate-charge-response'
import { env } from '@/env'

describe('Pix Imediate charge', () => {
  let pix: PixRequest<'SANDBOX'>
  let sut: PixImediateCharge<'SANDBOX'>

  beforeAll(() => {
    pix = new PixRequest({
      type: 'SANDBOX',
      options: {
        client_id: env.CLIENT_ID_HOMOLOGACAO ?? '',
        client_secret: env.CLIENT_SECRET_HOMOLOGACAO ?? '',
        certificate: env.CERTIFICADO_HOMOLOGACAO_BASE64,
        certificateType: 'base64',
      },
    })
    sut = pix.imediateCharge
  })

  it('should be able to create a new pix imediate charge with a base64 certificate', async () => {
    const resp = await sut.create({
      body: {
        calendario: { expiracao: 3600 },
        devedor: { cpf: '45618642883', nome: 'teste' },
        valor: { original: '15.00' },
        chave: env.PIX_KEY ?? '',
        solicitacaoPagador: 'teste',
      },
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixImediateChargeResponse)
  })
})
