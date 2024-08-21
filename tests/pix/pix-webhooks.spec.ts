import 'dotenv/config'

import dayjs from 'dayjs'

import { PixRequest } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix'
import { PixWebhooks } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks'
import { PixWebhooksAddResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks/pix-webhook-add-response'
import { PixWebhooksDeleteResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks/pix-webhook-delete-response'
import { PixWebhooksResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks/pix-webhook-response'
import { PixWebhooksResponseArray } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks/pix-webhook-response-array'
import { env } from '@/env'

describe.skip('Pix Webhooks', () => {
  let pix: PixRequest<'SANDBOX'>
  let sut: PixWebhooks<'SANDBOX'>

  beforeAll(() => {
    pix = new PixRequest({
      type: 'SANDBOX',
      options: {
        client_id: env.CLIENT_ID_HOMOLOGACAO,
        client_secret: env.CLIENT_SECRET_HOMOLOGACAO,
        certificate: env.CERTIFICADO_HOMOLOGACAO_PATH,
      },
    })
    sut = pix.webhooks
  })
  it('should be able add a webhook tracking a pix key', async () => {
    const webhookUrl = process.env.WEBHOOK_PIX
    const secondKey = process.env.PIX_KEY_SECOND

    if (!webhookUrl || !secondKey) {
      console.log('invalid (webhookUrl or secondary pix key)')
      return
    }

    const resp = await sut.add({
      chave: env.PIX_KEY,
      body: {
        webhookUrl,
      },
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixWebhooksAddResponse)
    expect(resp?.webhookUrl).toEqual(expect.any(String))
  })

  it('should be able find a webhook added by its pix key', async () => {
    const resp = await sut.findUnique({
      chave: env.PIX_KEY,
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixWebhooksResponse)
    expect(resp?.webhookUrl).toEqual(expect.any(String))
  })

  it('should be able find many webhooks added by its pix key', async () => {
    const resp = await sut.findMany({
      searchParams: {
        inicio: dayjs().subtract(3, 'day').toDate(),
        fim: new Date(),
        'paginacao.itensPorPagina': 2,
      },
    })

    console.log('resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixWebhooksResponseArray)
  })

  it('should be able to delete a webhook added by its pix key', async () => {
    const resp = await sut.delete({
      chave: env.PIX_KEY,
    })

    console.log('resp:', resp?.toJson(null, 2))
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixWebhooksDeleteResponse)
  })
})
