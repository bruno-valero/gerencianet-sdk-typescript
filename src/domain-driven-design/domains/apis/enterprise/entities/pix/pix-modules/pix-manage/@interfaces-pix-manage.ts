import { PixFilterSearchProps } from '../@interfaces-common'
import { E2eId, PixStatus, TxId } from '../@types-common'

export interface PixManageConsultProps {
  /**
   * EndToEndIdentification que transita na PACS002, PACS004 e PACS008. `32 characters` `^[a-zA-Z0-9]{32}`
   */
  e2eId: E2eId
}

type PixWebhooksConsultManyPropsSearchParams = Omit<
  PixFilterSearchProps['searchParams'],
  'status'
> & {
  /**
   * Filtra os Pix recebidos que têm ou não txid associadas
   */
  txIdPresente?: boolean
  /**
   * Filtra os Pix recebidos que têm ou não devoluções associadas
   */
  devolucaoPresente?: boolean
}

export interface PixWebhooksConsultManyProps extends PixFilterSearchProps {
  searchParams: PixWebhooksConsultManyPropsSearchParams
}

export interface PixWebhooksReturnProps {
  /**
   * EndToEndIdentification que transita na PACS002, PACS004 e PACS008. `32 characters` `^[a-zA-Z0-9]{32}`
   */
  e2eId: E2eId
  /**
   * Id gerado pelo cliente para representar unicamente uma devolução.
   *
   * string `^[a-zA-Z0-9]{32} {1,35}`
   */
  id: string
  body: {
    /**
     * Valor solicitado para devolução. A soma dos valores de todas as devolucões não podem ultrapassar o valor total do Pix.
     *
     * string `\d{1,10}\.\d{2}`
     */
    valor: string
  }
}

export interface PixWebhooksConsultReturnProps
  extends Omit<PixWebhooksReturnProps, 'body'> {}

export interface PixManageReturnResponseType {
  id: string
  rtrId: string
  /**
   * Valor da devolução
   *
   * string `\d{1,10}\.\d{2}`
   */
  valor: string
  /**
   * Contém o horário em que a devolução foi feita.
   *
   */
  horario: {
    /**
     * Horário em que a devolução foi feita.
     *
     * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
     */
    solicitacao: string
  }
  /**
   * O campo status no retorno do webhook representa a situação da requisição de envio direto de um Pix para uma chave Pix, podendo assumir os seguintes estados:
   *
   * `"EM_PROCESSAMENTO","REALIZADO", "NAO_REALIZADO"`
   */
  status: PixStatus
}

export interface PixManageResponseType {
  /**
   * EndToEndIdentification que transita na PACS002, PACS004 e PACS008. `32 characters` `^[a-zA-Z0-9]{32}`
   */
  endToEndId: E2eId
  /**
   * O campo txid determina o identificador da transação. Para mais detalhes [clique aqui](https://dev.efipay.com.br/docs/api-pix/glossario).
   *
   * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
   *
   * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
   * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
   *
   * - string (Id da Transação) `^[a-zA-Z0-9]{26,35}$`
   */
  txid: TxId
  /**
   * Valor da transação
   *
   * string `\d{1,10}\.\d{2}`
   */
  valor: string
  /**
   * Horário em que a transação foi feita.
   *
   * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
   */
  horario: string
  infoPagador: string
  devolucoes?: PixManageReturnResponseType[]
}
