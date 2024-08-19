import {
  Chave,
  CnpjFilterSearch,
  CpfFilterSearch,
  FimFilterSearch,
  InfoAdicionais,
  InicioFilterSearch,
  ItensPorPaginaFilterSearch,
  Loc,
  Location,
  PaginaAtualFilterSearch,
  Revisao,
  SolicitacaoPagador,
  Status,
  StatusFilterSearch,
  TxId,
} from '@/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/@types-common'

import {
  CalendarioRequest,
  CalendarioResponse,
  Devedor,
  LocRequest,
  Recebedor,
  Valor,
} from './@types-pix-due-charge'

export interface PixDueChargeCreateProps {
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
  body: {
    /**
     * Os campos aninhados sob o identificador calendário organizam informações a respeito de controle de tempo da cobrança.
     */
    calendario: CalendarioRequest
    /**
     * Os campos aninhados sob o objeto devedor são opcionais e identificam o devedor, ou seja, a pessoa ou a instituição a quem a cobrança está endereçada. Não identifica, necessariamente, quem irá efetivamente realizar o pagamento. Um CPF pode ser o devedor de uma cobrança, mas pode acontecer de outro CPF realizar, efetivamente, o pagamento do documento. Não é permitido que o campo pagador.cpf e campo pagador.cnpj estejam preenchidos ao mesmo tempo. Se o campo pagador.cnpj está preenchido, então o campo pagador.cpf não pode estar preenchido, e vice-versa. Se o campo pagador.nome está preenchido, então deve existir ou um pagador.cpf ou um campo pagador.cnpj preenchido.
     *
     * - Pessoa Física (object) or Pessoa Jurídica (object)
     */
    devedor: Devedor
    /**
     * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
     */
    valor: Valor
    /**
     * Identificador da localização do payload. Para associar a location a uma cobrança com vencimento, este location gerado deve ser do tipo cobv.
     */
    loc?: LocRequest
    /**
     * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
     *
     * - string (Chave DICT do recebedor) `≤ 77 characters`
     */
    chave: Chave
    /**
     * O campo solicitacaoPagador, opcional, determina um texto a ser apresentado ao pagador para que ele possa digitar uma informação correlata, em formato livre, a ser enviada ao recebedor. Esse texto será preenchido, na pacs.008, pelo PSP do pagador, no campo RemittanceInformation . O tamanho do campo na pacs.008 está limitado a 140 caracteres.
     *
     * - string (Solicitação ao pagador) `≤ 140 characters`
     */
    solicitacaoPagador?: SolicitacaoPagador
    /**
     * Cada respectiva informação adicional contida na lista (nome e valor) deve ser apresentada ao pagador.
     */
    infoAdicionais?: InfoAdicionais
  }
}

export interface PixDueChargeUpdateProps {
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
  body: {
    /**
     * Os campos aninhados sob o identificador calendário organizam informações a respeito de controle de tempo da cobrança.
     */
    calendario?: CalendarioRequest
    /**
     * Identificador da localização do payload. Para associar a location a uma cobrança com vencimento, este location gerado deve ser do tipo cobv.
     */
    loc?: LocRequest
    /**
     * Os campos aninhados sob o objeto devedor são opcionais e identificam o devedor, ou seja, a pessoa ou a instituição a quem a cobrança está endereçada. Não identifica, necessariamente, quem irá efetivamente realizar o pagamento. Um CPF pode ser o devedor de uma cobrança, mas pode acontecer de outro CPF realizar, efetivamente, o pagamento do documento. Não é permitido que o campo pagador.cpf e campo pagador.cnpj estejam preenchidos ao mesmo tempo. Se o campo pagador.cnpj está preenchido, então o campo pagador.cpf não pode estar preenchido, e vice-versa. Se o campo pagador.nome está preenchido, então deve existir ou um pagador.cpf ou um campo pagador.cnpj preenchido.
     *
     * - Pessoa Física (object) or Pessoa Jurídica (object)
     */
    devedor?: Partial<Devedor>
    /**
     * Status do registro da cobrança. String
     */
    status?: 'REMOVIDA_PELO_USUARIO_RECEBEDOR'
    /**
     * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
     */
    valor?: Partial<Valor>
    /**
     * O campo solicitacaoPagador, opcional, determina um texto a ser apresentado ao pagador para que ele possa digitar uma informação correlata, em formato livre, a ser enviada ao recebedor. Esse texto será preenchido, na pacs.008, pelo PSP do pagador, no campo RemittanceInformation . O tamanho do campo na pacs.008 está limitado a 140 caracteres.
     *
     * - string (Solicitação ao pagador) `≤ 140 characters`
     */
    solicitacaoPagador?: SolicitacaoPagador
    /**
     * Cada respectiva informação adicional contida na lista (nome e valor) deve ser apresentada ao pagador.
     */
    infoAdicionais?: InfoAdicionais
  }
}

export interface PixDueChargeFindUniqueProps {
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
  searchParams?: {
    /**
     * Permite recuperar revisões anteriores de uma cobrança. Na ausência desse parâmetro, sempre será retornada a cobrança conforme consta em sua última revisão.
     *
     * - integer($int32)
     */
    revisao?: Revisao
  }
}

export interface PixDueChargeFindManyProps {
  searchParams: {
    /**
     * Filtra os registros cuja data de criação seja maior ou igual que a data de início. Respeita RFC 3339.
     *
     * - `string`
     */
    inicio: InicioFilterSearch
    /**
     * Filtra os registros cuja data de criação seja menor ou igual que a data de fim. Respeita RFC 3339.
     *
     * - `string`
     */
    fim: FimFilterSearch
    /**
     * Filtro pelo CPF do pagador. Não pode ser utilizado ao mesmo tempo que o CNPJ.
     *
     * - string `/^\d{11}$/`
     */
    cpf?: CpfFilterSearch
    /**
     * Filtro pelo CNPJ do pagador. Não pode ser utilizado ao mesmo tempo que o CPF.
     *
     * - string `/^\d{14}$/`
     */
    cnpj?: CnpjFilterSearch
    /**
     * Filtro pelo status da cobrança.
     *
     * - Enum: `"ATIVA"`,`"CONCLUIDA"`, `"REMOVIDA_PELO_USUARIO_RECEBEDOR"`, `"REMOVIDA_PELO_PSP"`
     */
    status?: StatusFilterSearch
    /**
     * Página a ser retornada pela consulta. Se não for informada, o PSP assumirá que será 0.
     *
     * - integer {int32} (Página atual) `>= 0`
     * - Default: `0`
     */
    'paginacao.paginaAtual'?: PaginaAtualFilterSearch
    /**
     * Quantidade máxima de registros retornados em cada página. Apenas a última página pode conter uma quantidade menor de registros.
     *
     * - integer {int32} (Página atual) `[1 .. 1000]`
     * - Default: `100`
     */
    'paginacao.itensPorPagina'?: ItensPorPaginaFilterSearch
  }
}

/**
 * Resposta padrão de uma cobrança pix do tipo DueCharge
 */
export interface PixDueChargeResponseType {
  /**
   * Os campos aninhados sob o identificador **calendário** organizam informações a respeito de controle de tempo da cobrança.
   */
  calendario: CalendarioResponse
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
   * Permite recuperar revisões anteriores de uma cobrança. Na ausência desse parâmetro, sempre será retornada a cobrança conforme consta em sua última revisão.
   *
   * - integer($int32)
   */
  revisao: Revisao
  loc: Loc<'cobv'>
  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  location: Location
  status: Status
  /**
   * Os campos aninhados sob o objeto devedor são opcionais e identificam o devedor, ou seja, a pessoa ou a instituição a quem a cobrança está endereçada. Não identifica, necessariamente, quem irá efetivamente realizar o pagamento. Um CPF pode ser o devedor de uma cobrança, mas pode acontecer de outro CPF realizar, efetivamente, o pagamento do documento. Não é permitido que o campo pagador.cpf e campo pagador.cnpj estejam preenchidos ao mesmo tempo. Se o campo pagador.cnpj está preenchido, então o campo pagador.cpf não pode estar preenchido, e vice-versa. Se o campo pagador.nome está preenchido, então deve existir ou um pagador.cpf ou um campo pagador.cnpj preenchido.
   *
   * - Pessoa Física (object) or Pessoa Jurídica (object)
   */
  devedor: Devedor
  /**
   * Os campos aninhados sob o objeto devedor são opcionais e identificam o recebedor, ou seja, a pessoa ou a instituição a quem será beneficiada. Não é permitido que o campo recebedor.cpf e campo recebedor.cnpj estejam preenchidos ao mesmo tempo. Se o campo recebedor.cnpj está preenchido, então o campo recebedor.cpf não pode estar preenchido, e vice-versa. Se o campo recebedor.nome está preenchido, então deve existir ou um recebedor.cpf ou um campo recebedor.cnpj preenchido.
   *
   * - Pessoa Física (object) or Pessoa Jurídica (object)
   */
  recebedor: Recebedor
  /**
   * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
   */
  valor: Valor
  /**
   * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
   *
   * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
   *
   * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
   *
   * - string (Chave DICT do recebedor) `≤ 77 characters`
   */
  chave: Chave
  /**
   * O campo solicitacaoPagador, opcional, determina um texto a ser apresentado ao pagador para que ele possa digitar uma informação correlata, em formato livre, a ser enviada ao recebedor. Esse texto será preenchido, na pacs.008, pelo PSP do pagador, no campo RemittanceInformation . O tamanho do campo na pacs.008 está limitado a 140 caracteres.
   *
   * - string (Solicitação ao pagador) `≤ 140 characters`
   */
  solicitacaoPagador: SolicitacaoPagador
  pixCopiaECola: string
}
