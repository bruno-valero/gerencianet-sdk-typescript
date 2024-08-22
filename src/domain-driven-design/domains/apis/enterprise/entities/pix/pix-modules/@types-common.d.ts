import { TipoCob } from '../value-objects/pix-location'

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
export type TxId = string

/**
 * EndToEndIdentification que transita na PACS002, PACS004 e PACS008. `32 characters` `^[a-zA-Z0-9]{32}`
 */
export type E2eId = string

/**
 * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
 *
 * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
 *
 * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
 *
 * - string (Chave DICT do recebedor) `≤ 77 characters`
 */
export type Chave = string

/**
 * O campo solicitacaoPagador, opcional, determina um texto a ser apresentado ao pagador para que ele possa digitar uma informação correlata, em formato livre, a ser enviada ao recebedor. Esse texto será preenchido, na pacs.008, pelo PSP do pagador, no campo RemittanceInformation . O tamanho do campo na pacs.008 está limitado a 140 caracteres.
 *
 * - string (Solicitação ao pagador) `≤ 140 characters`
 */
export type SolicitacaoPagador = string

/**
 * Permite recuperar revisões anteriores de uma cobrança. Na ausência desse parâmetro, sempre será retornada a cobrança conforme consta em sua última revisão.
 *
 * - integer($int32)
 */
export type Revisao = number

/**
 * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
 */
export type Location = string

export type Loc<type extends 'cob' | 'cobv' | undefined = undefined> = {
  /**
   *  ID do location a ser associada a cobrança. int32
   */
  id: number
  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  location: Location
  tipoCob: TipoCob<type>
  criacao?: string
  txid?: string
}

/**
 * Cada respectiva informação adicional contida na lista (nome e valor) deve ser apresentada ao pagador.
 */
export type InfoAdicionais = {
  /**
   * Nome do campo string (Nome) `≤ 50 characters`
   */
  nome: string
  /**
   * Dados do campo string (Valor) `≤ 200 characters`
   */
  valor: string
}[]

/**
 * O campo status no retorno do webhook representa a situação da requisição de envio direto de um Pix para uma chave Pix, podendo assumir os seguintes estados:
 *
 * `"EM_PROCESSAMENTO","REALIZADO", "NAO_REALIZADO"`
 */
export type PixStatus = 'EM_PROCESSAMENTO' | 'REALIZADO' | 'NAO_REALIZADO'

export type Status =
  | 'ATIVA'
  | 'CONCLUIDA'
  | 'REMOVIDA_PELO_USUARIO_RECEBEDOR'
  | 'REMOVIDA_PELO_PSP'

/**
 * Filtra os registros cuja data de criação seja maior ou igual que a data de início. Respeita RFC 3339.
 *
 * - `string`
 */
export type InicioFilterSearch = Date
/**
 * Filtra os registros cuja data de criação seja menor ou igual que a data de fim. Respeita RFC 3339.
 *
 * - `string`
 */
export type FimFilterSearch = Date
/**
 * Filtro pelo CPF do pagador. Não pode ser utilizado ao mesmo tempo que o CNPJ.
 *
 * - string `/^\d{11}$/`
 */
export type CpfFilterSearch = string
/**
 * Filtro pelo CNPJ do pagador. Não pode ser utilizado ao mesmo tempo que o CPF.
 *
 * - string `/^\d{14}$/`
 */
export type CnpjFilterSearch = string
/**
 * Filtro pelo status da cobrança.
 *
 * - Enum: `"ATIVA"`,`"CONCLUIDA"`, `"REMOVIDA_PELO_USUARIO_RECEBEDOR"`, `"REMOVIDA_PELO_PSP"`
 */
export type StatusFilterSearch = Status
/**
 * Página a ser retornada pela consulta. Se não for informada, o PSP assumirá que será 0.
 *
 * - integer {int32} (Página atual) `>= 0`
 * - Default: `0`
 */
export type PaginaAtualFilterSearch = number
/**
 * Quantidade máxima de registros retornados em cada página. Apenas a última página pode conter uma quantidade menor de registros.
 *
 * - integer {int32} (Página atual) `[1 .. 1000]`
 * - Default: `100`
 */
export type ItensPorPaginaFilterSearch = number
