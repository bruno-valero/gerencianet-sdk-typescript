import 'dotenv/config'

import dayjs from 'dayjs'

import { PixRequest } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix'
import { PixManage } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-manage'
import { PixManageResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-manage/pix-manage-response'
import { PixManageReturnResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-manage/pix-manage-return-response'
import { env } from '@/env'

describe('Pix Manage', () => {
  let pix: PixRequest<'SANDBOX'>
  let sut: PixManage<'SANDBOX'>

  beforeAll(() => {
    pix = new PixRequest({
      type: 'SANDBOX',
      options: {
        client_id: env.CLIENT_ID_HOMOLOGACAO ?? '',
        client_secret: env.CLIENT_SECRET_HOMOLOGACAO ?? '',
        certificate: env.CERTIFICADO_HOMOLOGACAO_PATH,
      },
    })
    sut = pix.manage
  })
  it.skip('should be able to consult a received pix', async () => {
    const webhookUrl = process.env.WEBHOOK_PIX
    const secondKey = process.env.PIX_KEY_SECOND

    if (!webhookUrl || !secondKey) {
      console.log('invalid (webhookUrl or secondary pix key)')
      return
    }

    const resp = await sut.consult({
      e2eId: '',
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixManageResponse)
  })

  it.skip('should be able to consult many received pix', async () => {
    const resp = await sut.consultMany({
      searchParams: {
        inicio: dayjs().subtract(3, 'day').toDate(),
        fim: new Date(),
        'paginacao.itensPorPagina': 2,
      },
    })

    console.log('consultMany resp:', resp)
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixManageResponse)
  })

  it.skip('should be able to return a received pix', async () => {
    const resp = await sut.return({
      e2eId: '',
      id: '',
      body: {
        valor: '10.00',
      },
    })

    console.log('resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixManageReturnResponse)
  })

  it.skip('should be able to consult a returned pix', async () => {
    const resp = await sut.consultReturn({
      e2eId: '',
      id: '',
    })

    console.log('resp:', resp?.toJson(null, 2))
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixManageReturnResponse)
  })
})
