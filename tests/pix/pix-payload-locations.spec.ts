import 'dotenv/config'

import dayjs from 'dayjs'

import { PixRequest } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix'
import { PixPayloadLocations } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payload-locations'
import { PixPayloadLocationsQRCodeResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payload-locations/pix-payload-locations-qr-code-response'
import { PixPayloadLocationsResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payload-locations/pix-payload-locations-response'
import { PixPayloadLocationsResponseArray } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payload-locations/pix-payload-locations-response-array'
import { env } from '@/env'

describe.skip('Pix Manage', () => {
  let pix: PixRequest<'SANDBOX'>
  let sut: PixPayloadLocations<'SANDBOX'>

  beforeAll(() => {
    pix = new PixRequest({
      type: 'SANDBOX',
      options: {
        client_id: env.CLIENT_ID_HOMOLOGACAO,
        client_secret: env.CLIENT_SECRET_HOMOLOGACAO,
        certificate: env.CERTIFICADO_HOMOLOGACAO_PATH,
      },
    })
    sut = pix.payloadLocations
  })
  it('should be able to create a payload location', async () => {
    const resp = await sut.create({
      body: {
        tipoCob: 'cob',
      },
    })

    console.log('create resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPayloadLocationsResponse)
  })

  it('should be able to find a unique payload location', async () => {
    const resp = await sut.findUnique({
      id: 119,
    })

    console.log('findUnique resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPayloadLocationsResponse)
  })

  it('should be able to find many a payload locations', async () => {
    const resp = await sut.findMany({
      searchParams: {
        inicio: dayjs().subtract(3, 'day').toDate(),
        fim: new Date(),
        'paginacao.itensPorPagina': 2,
      },
    })

    console.log('findMany resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPayloadLocationsResponseArray)
  })

  it('should be able to generate a QRCode form a payload location', async () => {
    const resp = await sut.generateQrCode({
      id: 117,
    })

    console.log('generate a QRCode resp:', resp?.toJson(null, 2))
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPayloadLocationsQRCodeResponse)
  })

  it('should be able to detach a payload location from a txid', async () => {
    const resp = await sut.detachTxId({
      id: 119,
    })

    console.log('detachTxId resp:', resp?.toJson(null, 2))
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixPayloadLocationsResponse)
  })
})
