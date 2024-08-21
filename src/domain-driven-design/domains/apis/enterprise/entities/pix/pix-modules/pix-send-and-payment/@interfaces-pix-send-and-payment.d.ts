import {
  Favorecido,
  IdEnvio,
  Pagador,
  Valor,
} from './@types-pix-send-and-payment'

export interface PixSendAndPaymentSendProps {
  /**
   * O campo idEnvio determina o identificador da transação. `string \d{1,10}\.\d{2}`
   */
  idEnvio: IdEnvio
  body: {
    /**
     * Valores monetários referentes à cobrança.
     *
     * string `\d{1,10}\.\d{2}`
     */
    valor: Valor
    /**
     * O campo pagador contém a chave Pix associada a conta autenticada que será debitado o valor definido.
     */
    pagador: Pagador
    /**
     * O campo favorecido contém a chave Pix ou os dados bancários que será creditado o valor definido.
     */
    favorecido: Favorecido
  }
}

export interface PixSendAndPaymentSendResponseType {
  /**
   * O campo idEnvio determina o identificador da transação. `string \d{1,10}\.\d{2}`
   */
  idEnvio: IdEnvio
  /**
   * EndToEndIdentification que transita na PACS002, PACS004 e PACS008. `32 characters` `^[a-zA-Z0-9]{32}`
   */
  e2eId: E2eId
  /**
   * Valores monetários referentes à cobrança.
   *
   * string `\d{1,10}\.\d{2}`
   */
  valor: Valor
  /**
   * Contém o horário em que a transação foi feita.
   *
   */
  horario: {
    /**
     * Horário em que a transação foi feita.
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
  status: Status
}
