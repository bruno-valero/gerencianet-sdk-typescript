import 'dotenv/config'

import dayjs from 'dayjs'

import { PixRequest } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix'
import { PixBatchCollections } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-batch-collections'
import { PixBatchCollectionsResponse } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-batch-collections/pix-batch-collections-response'
import { PixBatchCollectionsResponseArray } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-batch-collections/pix-batch-collections-response-array'
import { TxId } from '@/domain-driven-design/domains/apis/enterprise/entities/pix/value-objects/tx-id'
import { env } from '@/env'

describe('Pix Batch Collections', () => {
  let pix: PixRequest<'SANDBOX'>
  let sut: PixBatchCollections<'SANDBOX'>

  beforeAll(() => {
    pix = new PixRequest({
      type: 'SANDBOX',
      options: {
        client_id: env.CLIENT_ID_HOMOLOGACAO,
        client_secret: env.CLIENT_SECRET_HOMOLOGACAO,
        certificate: env.CERTIFICADO_HOMOLOGACAO_PATH,
      },
    })
    sut = pix.batchCollections
  })
  it.skip('should be able to create a due charge batch', async () => {
    const resp = await sut.createOrUpdateDueChargeBatch({
      id: 7,
      body: {
        descricao: 'teste',
        cobsv: [
          {
            txid: new TxId().value,
            calendario: {
              dataDeVencimento: dayjs()
                .add(4, 'day')
                .format('YYYY-MM-DD') as `${string}-${string}-${string}`,
              validadeAposVencimento: 30,
            },
            chave: env.PIX_KEY,
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
          {
            txid: new TxId().value,
            calendario: {
              dataDeVencimento: dayjs()
                .add(8, 'day')
                .format('YYYY-MM-DD') as `${string}-${string}-${string}`,
              validadeAposVencimento: 16,
            },
            chave: env.PIX_KEY,
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
              original: '31.00',
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
        ],
      },
    })

    console.log('createOrUpdateDueChargeBatch resp success:', resp?.success)
    expect(resp?.success).toEqual(true)
    // expect(resp).toBeInstanceOf(PixManageResponse)
  })

  it.skip('should be able to update a due charge batch', async () => {
    const resp = await sut.updateDueChargeBatch({
      id: 6,
      body: {
        cobsv: [
          {
            txid: new TxId().value,
            calendario: {
              dataDeVencimento: dayjs()
                .add(4, 'day')
                .format('YYYY-MM-DD') as `${string}-${string}-${string}`,
              validadeAposVencimento: 30,
            },
            chave: env.PIX_KEY,
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
          {
            txid: new TxId().value,
            calendario: {
              dataDeVencimento: dayjs()
                .add(8, 'day')
                .format('YYYY-MM-DD') as `${string}-${string}-${string}`,
              validadeAposVencimento: 16,
            },
            chave: env.PIX_KEY,
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
              original: '31.00',
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
        ],
      },
    })

    console.log('updateDueChargeBatch resp success:', resp?.success)
    expect(resp?.success).toEqual(true)
    // expect(resp).toBeInstanceOf(PixManageResponse)
  })

  it.skip('should be able to find a unique due charge batch', async () => {
    const resp = await sut.findUniqueDueChargeBatch({
      id: 7,
    })

    console.log('findUniqueDueChargeBatch resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixBatchCollectionsResponse)
  })

  it('should be able to consult a returned pix', async () => {
    const resp = await sut.findManyDueChargeBatch({
      searchParams: {
        inicio: dayjs().subtract(3, 'day').toDate(),
        fim: new Date(),
        'paginacao.itensPorPagina': 2,
      },
    })

    console.log('resp:', resp?.toObject())
    expect(resp).not.toBeNull()
    expect(resp).toBeInstanceOf(PixBatchCollectionsResponseArray)
  })
})
