import { PixRequest } from '@pixEnterprise/pix'
import dayjs from 'dayjs'

import { PixImediateCharge } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-imediate-charge'
import { PixImediateChargeResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-imediate-charge/pix-imediate-charge-response'
import { PixImediateChargeResponseArray } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-imediate-charge/pix-imediate-charge-response-array'
import { TxId } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/value-objects/tx-id'
import { env } from '@/env'

describe('Pix Imediate charge', () => {
  let pix: PixRequest<'SANDBOX'>
  let sut: PixImediateCharge<'SANDBOX'>

  beforeAll(() => {
    pix = new PixRequest({
      type: 'SANDBOX',
      options: {
        client_id: env.CLIENT_ID_HOMOLOGACAO,
        client_secret: env.CLIENT_SECRET_HOMOLOGACAO,
        certificate: env.CERTIFICADO_HOMOLOGACAO_PATH,
      },
    })
    sut = pix.imediateCharge
  })

  it('should be able to create a new pix imediate charge without Txid', async () => {
    const resp = await sut.create({
      body: {
        calendario: { expiracao: 3600 },
        devedor: { cpf: '45618642883', nome: 'teste' },
        valor: { original: '15.00' },
        chave: env.PIX_KEY,
        solicitacaoPagador: 'teste',
      },
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixImediateChargeResponse)
  })

  it('should be able to create a new pix imediate charge with Txid', async () => {
    const resp = await sut.create({
      body: {
        calendario: { expiracao: 3600 },
        devedor: { cpf: '45618642883', nome: 'teste' },
        valor: { original: '10.00' },
        chave: env.PIX_KEY,
        solicitacaoPagador: 'teste',
      },
      txid: new TxId().value,
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixImediateChargeResponse)
  })
  it('should be able to update a pix imediate charge', async () => {
    const resp = await sut.update({
      body: {
        valor: {
          original: '32.60',
        },
      },
      txid: '854f8ccbffb048118a8d48a8fb77f313',
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixImediateChargeResponse)
    expect(resp?.valor.units).toEqual(32.6)
  })

  it("should be able to find one pix imediate charge by it's Txid", async () => {
    const resp = await sut.findUnique({
      txid: 'f16aceb56bde436bb5d47d417f61c52d',
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixImediateChargeResponse)
  })

  it('should be able to find many pix imediate charges, with two charges per page', async () => {
    const resp = await sut.findMany({
      searchParams: {
        inicio: dayjs().subtract(3, 'day').toDate(),
        fim: new Date(),
        'paginacao.itensPorPagina': 2,
      },
    })

    console.log('resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixImediateChargeResponseArray)
    expect(resp?.cobs).toHaveLength(2)
  })
  it('should be able to find many pix imediate charges, with two charges per page where status is active', async () => {
    const resp = await sut.findMany({
      searchParams: {
        inicio: dayjs().subtract(3, 'day').toDate(),
        fim: new Date(),
        'paginacao.itensPorPagina': 2,
        status: 'ATIVA',
      },
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixImediateChargeResponseArray)
    expect(resp?.cobs).toHaveLength(2)
    expect(resp?.cobs.map((item) => item.status)).toEqual(['ATIVA', 'ATIVA'])
  })
})
