import { PixRequest } from '@pixEnterprise/pix'
import dayjs from 'dayjs'

import { PixDueCharge } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge'
import { PixDueChargeResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/pix-due-charge-response'
import { PixDueChargeResponseArray } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/pix-due-charge-response-array'
import { TxId } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/value-objects/tx-id'
import { env } from '@/env'

describe('Pix due change', () => {
  let pix: PixRequest<'SANDBOX'>
  let sut: PixDueCharge<'SANDBOX'>

  beforeAll(() => {
    pix = new PixRequest({
      type: 'SANDBOX',
      options: {
        client_id: env.CLIENT_ID_HOMOLOGACAO,
        client_secret: env.CLIENT_SECRET_HOMOLOGACAO,
        certificate: env.CERTIFICADO_HOMOLOGACAO_PATH,
      },
    })
    sut = pix.dueCharge
  })

  it('should be able to create a new pix due charge', async () => {
    const resp = await sut.create({
      txid: new TxId().value,
      body: {
        calendario: {
          dataDeVencimento: dayjs()
            .add(5, 'day')
            .format('YYYY-MM-DD') as `${string}-${string}-${string}`,
          validadeAposVencimento: 20,
        },
        chave: env.PIX_RAMDOM_KEY,
        devedor: {
          cpf: '45618677830',
          nome: 'bruno',
          cep: '07402800',
          cidade: 'aruja',
          email: 'bruno@gmail.com',
          logradouro: 'rua dois',
          uf: 'SP',
        },
        valor: {
          original: '15.00',
          multa: {
            modalidade: 2,
            valorPerc: '15.00',
          },
          juros: {
            modalidade: 2,
            valorPerc: '15.00',
          },
          desconto: {
            modalidade: 2,
            descontoDataFixa: [
              {
                data: dayjs()
                  .add(1, 'day')
                  .format('YYYY-MM-DD') as `${string}-${string}-${string}`,
                valorPerc: '10.00',
              },
            ],
          },
        },
      },
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixDueChargeResponse)
  })

  it("should be able to find one pix due charge by it's Txid", async () => {
    const resp = await sut.findUnique({
      txid: '8016bb64775742d1bb122ee67393faa1',
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixDueChargeResponse)
  })

  it('should be able to find many pix due charges, with two charges per page', async () => {
    const resp = await sut.findMany({
      searchParams: {
        inicio: dayjs().subtract(3, 'day').toDate(),
        fim: new Date(),
        'paginacao.itensPorPagina': 2,
      },
    })

    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixDueChargeResponseArray)
    expect(resp?.cobs).toHaveLength(2)
  })
})
