import 'dotenv/config'

import { PixRequest } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix'
import { PixPaymentSplit } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payment-split'
import { PixPaymentSplitAttachmentResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payment-split/pix-payment-split-attachment-response'
import { PixPaymentSplitDueChargeAttachmentResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payment-split/pix-payment-split-due-charge-attachment-response'
import { PixPaymentSplitImediateChargeAttachmentResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payment-split/pix-payment-split-imediate-charge-attachment-response'
import { PixPaymentSplitResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payment-split/pix-payment-split-response'
import { env } from '@/env'

describe('Pix Payment Split', () => {
  let pix: PixRequest<'SANDBOX'>
  let sut: PixPaymentSplit<'SANDBOX'>

  beforeAll(() => {
    pix = new PixRequest({
      type: 'SANDBOX',
      options: {
        client_id: env.CLIENT_ID_HOMOLOGACAO ?? '',
        client_secret: env.CLIENT_SECRET_HOMOLOGACAO ?? '',
        certificate: env.CERTIFICADO_HOMOLOGACAO_PATH,
      },
    })
    sut = pix.paymentSplit
  })
  it.skip('should be able to create a payment split without id', async () => {
    const resp = await sut.create({
      body: {
        descricao: 'teste',
        lancamento: {
          imediato: true,
        },
        split: {
          divisaoTarifa: 'assumir_total',
          minhaParte: {
            tipo: 'porcentagem',
            valor: '60.00',
          },
          repasses: [
            {
              favorecido: {
                cpf: '45618677830',
                conta: '5981451',
              },
              tipo: 'porcentagem',
              valor: '40.00',
            },
          ],
        },
      },
    })

    console.log('create resp:', resp?.toJson(null, 2))
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPaymentSplitResponse)
  })

  it.skip('should be able to attach a imediate charge to a payment split', async () => {
    const resp = await sut.attachImediateCharge({
      txid: '0265df5b2aac44528eef311e1bee0fec',
      splitConfigId: 'b818879d33374da79b8cb2ae281c8012',
    })

    console.log('attachImediateCharge resp:', resp?.toJson(null, 2))
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPaymentSplitAttachmentResponse)
  })

  it.skip('should be able to find a unique attached imediate charge to a payment split', async () => {
    const resp = await sut.findUniqueImediateChargeAttachment({
      txid: '0265df5b2aac44528eef311e1bee0fec',
    })

    console.log('findUniqueImediateChargeAttachment resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPaymentSplitImediateChargeAttachmentResponse)
  })

  it.skip('should be able to delete an attached imediate charge to a payment split', async () => {
    const resp = await sut.deleteImediateChargeAttachment({
      txid: '0265df5b2aac44528eef311e1bee0fec',
    })

    console.log('deleteImediateChargeAttachment resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPaymentSplitAttachmentResponse)
  })

  it.skip('should be able to attach a due charge to a payment split', async () => {
    const resp = await sut.attachDueCharge({
      txid: '6947fb9067a0441891399826a9af594',
      splitConfigId: 'b818879d33374da79b8cb2ae281c8012',
    })

    console.log('attachDueCharge resp:', resp?.toJson(null, 2))
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPaymentSplitAttachmentResponse)
  })

  it.skip('should be able to find a unique attached due charge to a payment split', async () => {
    const resp = await sut.findUniqueDueChargeAttachment({
      txid: '6947fb9067a0441891399826a9af594',
    })

    console.log('findUniqueDueChargeAttachment resp:', resp?.toJson(null, 2))
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPaymentSplitDueChargeAttachmentResponse)
  })

  it.skip('should be able to delete an attached due charge to a payment split', async () => {
    const resp = await sut.deleteDueChargeAttachment({
      txid: '6947fb9067a0441891399826a9af594',
    })

    console.log('deleteDueChargeAttachment resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPaymentSplitAttachmentResponse)
  })
})
