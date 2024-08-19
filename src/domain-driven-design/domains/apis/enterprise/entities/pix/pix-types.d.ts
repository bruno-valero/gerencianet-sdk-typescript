export interface CreatePixProps {
  txid?: string
  searchParams?: Record<string, string>
  body: {
    calendario: {
      /**
       * Passe o valor em segundos de expiração para o pix criado
       *
       * exemplo: 3600 (isso indica que o pix deve ser pago dentro de uma hora, caso contrário outro pix deve ser criado)
       */
      expiracao: number
    }
    devedor: {
      cpf: string
      nome: string
    }
    valor: {
      /**
       * Passe o valor em Reais, não em Centavos.
       *
       * exemplo: "123.45" (cento e vinte e três reais e quarenta e cinco centavos) */
      original: string
    }
    /** Informe sua chave Pix cadastrada na efipay	 */
    chave: string
    /** O campo é opcional */
    infoAdicionais?: [
      {
        nome: string
        valor: string
      },
      {
        nome: string
        valor: string
      },
    ]
  }
}

export type CreatePixImediateResponse = {
  calendario: {
    criacao: '2020-09-09T20:15:00.358Z'
    expiracao: 3600
  }
  txid: '7978c0c97ea847e78e8849634473c1f1'
  revisao: 0
  loc: {
    id: 789
    location: 'pix.example.com/qr/v2/9d36b84fc70b478fb95c12729b90ca25'
    tipoCob: 'cob'
  }
  location: 'pix.example.com/qr/v2/9d36b84fc70b478fb95c12729b90ca25'
  status: 'ATIVA'
  devedor: {
    cnpj: '12345678000195'
    nome: 'Empresa de Serviços SA'
  }
  valor: {
    original: '567.89'
  }
  chave: 'a1f4102e-a446-4a57-bcce-6fa48899c1d1'
  solicitacaoPagador: 'Informar cartão fidelidade'
  pixCopiaECola: '00020101021226830014BR.GOV.BCB.PIX2561qrcodespix.sejaefi.com.br/v2/41e0badf811a4ce6ad8a80b306821fce5204000053000065802BR5905EFISA6008SAOPAULO60070503***61040000'
}

export type CreatePixResponse = {
  calendario: {
    criacao: Date
    expiracao: 3600
  }
  txid: '7978c0c97ea847e78e8849634473c1f1'
  revisao: 0
  loc: {
    id: 789
    location: 'pix.example.com/qr/v2/9d36b84fc70b478fb95c12729b90ca25'
    tipoCob: 'cob'
  }
  location: 'pix.example.com/qr/v2/9d36b84fc70b478fb95c12729b90ca25'
  status: 'ATIVA'
  devedor: {
    cnpj: '12345678000195'
    nome: 'Empresa de Serviços SA'
  }
  valor: {
    original: '567.89'
  }
  chave: 'a1f4102e-a446-4a57-bcce-6fa48899c1d1'
  solicitacaoPagador: 'Informar cartão fidelidade'
  pixCopiaECola: '00020101021226830014BR.GOV.BCB.PIX2561qrcodespix.sejaefi.com.br/v2/41e0badf811a4ce6ad8a80b306821fce5204000053000065802BR5905EFISA6008SAOPAULO60070503***61040000'
}
