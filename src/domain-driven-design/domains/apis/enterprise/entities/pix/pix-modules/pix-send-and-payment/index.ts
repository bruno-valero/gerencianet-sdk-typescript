import { ApiRequest } from '@/domain-driven-design/core/apis/api-request'
import { EnvironmentTypes } from '@/domain-driven-design/core/apis/constants-callbacks'

import { PixSendAndPaymentSendProps } from './@interfaces-pix-send-and-payment'
import { PixSendAndPaymentSendResponse } from './pix-send-and-payment-send-response'

/**
 *  Traz as funcionalidades disponíveis para a gestão do Envio de Pix e do Pagamento de QR Codes Pix
 */
export class PixSendAndPayment<
  type extends EnvironmentTypes,
> extends ApiRequest<type, 'PIX'> {
  /**
   * Destinado a realizar o envio direto de um Pix para uma chave Pix cadastrada em um PSP seja da Efí ou outro. Esse endpoint poderá sofrer alterações quando entrar no escopo de padronização do BACEN. Neste caso, os clientes habilitados serão avisados com antecedência.
   *
   * Para utilização do endpoint de Requisitar envio de Pix, além da liberação do escopo `pix.send` na conta, **é necessário que a chave Pix do pagador tenha um webhook associado a ela**. Por meio do webhook a Efí irá informar a você se o envio do Pix foi realizado com sucesso ou não.
   *
   * Caso a sua aplicação tenha sido criada anterior à data 29/07/2024, será necessário alterar os escopos (?), desativando e ativando novamente o escopo `pix.send`, dentro de API Pix, para utilizar o recurso.
   *
   * ---
   *
   * ## Testes em Homologação
   *
   * Se você precisa testar o endpoint de envio de Pix, temos um ambiente funcional de homologação onde é possível simular todos os status retornados pela nossa API e pelo webhook.
   *
   * - Se o valor do Pix está entre **R$ 0.01** à **R$ 10.00**: Pix é confirmado, informação virá via Webhook.
   * - Se o valor do Pix está entre **R$ 10.01** à **R$ 20.00**: Pix é rejeitado, informação virá via Webhook.
   * - Se o valor do Pix é acima de **R$ 20.00**: Pix é rejeitado já na requisição, informação não virá via Webhook.
   * - Os pagamentos enviados com valor de **R$ 4,00** irão gerar duas devoluções recebidas no valor de **R$ 2,00**.
   * - Os pagamentos enviados com valor de **R$ 5,00** irão gerar uma devolução recebida no valor de **R$ 5,00**.
   * - Os pagamentos enviados via chave só serão confirmados ou rejeitados se for utilizada a chave de homologação: `efipay@sejaefi.com.br`. Caso contrário, um erro de chave inválida será informado.
   * - Os pagamentos enviados via dados bancários não sofrem alterações.
   *
   * ### Atenção!
   *
   * Para melhorar o desempenho do serviço e evitar conflitos de saldo, recomendamos que **o envio de Pix por API seja condicionado à conclusão da transação anterior, que é notificada por meio do webhook**. Se essa prática não for seguida e várias requisições de envio forem feitas ao mesmo tempo, o integrador pode enfrentar problemas no envio.
   *
   * @param PixSendAndPaymentSendProps
   */
  async send({ body, idEnvio }: PixSendAndPaymentSendProps) {
    const { method, route } = this.endpoints.ENDPOINTS.pixSend({
      idEnvio,
    })

    const resp = await this.sendRequest({
      body,
      method,
      route,
      ResponseClass: PixSendAndPaymentSendResponse,
    })

    return resp
  }

  // eslint-disable-next-line
  // @ts-ignore
  useCredentials({
    clientId,
    clientSecret,
  }: {
    clientId: string
    clientSecret: string
  }) {
    const type = this.type
    const options = this.options
    const pix = new PixSendAndPayment(type, 'PIX', {
      ...options,
      client_id: clientId,
      client_secret: clientSecret,
    })

    return pix
  }
}
