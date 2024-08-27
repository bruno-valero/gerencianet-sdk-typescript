import { existsSync, PathLike, readFileSync, writeFileSync } from 'node:fs'

import {
  CertificateType,
  EfiConfig,
} from './domain-driven-design/core/apis/config'
import {
  EnvironmentTypes,
  OperationTypes,
} from './domain-driven-design/core/apis/constants-callbacks'
import { Optional } from './domain-driven-design/core/types/optional'
import { CobrancaRequest } from './domain-driven-design/domains/apis/enterprise/entities/cobranca/cobranca'
import { PixRequest } from './domain-driven-design/domains/apis/enterprise/entities/pix/pix'
import { env } from './env'

export * from './exports.classes'
export type * from './exports.interfaces'

type Options<
  type extends EnvironmentTypes,
  operation extends OperationTypes | undefined = undefined,
> = Optional<EfiConfig<type, operation>, 'sandbox'>

type OptionsCredentials = {
  client_id?: string
  client_secret?: string
  certificate?: PathLike
  certificateType?: CertificateType
  validateMtls?: boolean
}

interface MakeOptionsProps<
  type extends EnvironmentTypes,
  operation extends OperationTypes | undefined,
> {
  type: type
  operation?: operation
  data?: OptionsCredentials
}

type GenerateDotEnvProps = {
  variables?: {
    CERTIFICADO_HOMOLOGACAO_PATH?: string
    CERTIFICADO_PRODUCAO_PATH?: string
    CERTIFICADO_HOMOLOGACAO_BASE64?: string
    CERTIFICADO_PRODUCAO_BASE64?: string
    CLIENT_ID_HOMOLOGACAO?: string
    CLIENT_SECRET_HOMOLOGACAO?: string
    CLIENT_ID_PRODUCAO?: string
    CLIENT_SECRET_PRODUCAO?: string
    PIX_KEY?: string
    WEBHOOK_PIX?: string
    ACCOUNT_IDENTIFIER?: string
  }
  mode?: 'append' | 'overwrite'
}

type CertificateFromBufferProps = {
  /**
   *
   * ---
   *
   * Certificado de Homologação em formato `Buffer`.
   *
   * ---
   *
   */
  certificadoHomologacaoBuffer?: Buffer
  /**
   *
   * ---
   *
   * Certificado de Produção em formato `Buffer`.
   *
   * ---
   *
   */
  certificadoProducaoBuffer?: Buffer
}

type GenerateBase64FromCertificateProps = {
  /**
   *
   * ---
   *
   *  Caminho onde o arquivo de Homologação está salvo.
   *
   * Passe o caminho para realizar a conversão para `base64`.
   *
   * ---
   *
   */
  certificadoHomologacaoPath?: string
  /**
   *
   * ---
   *
   *  Caminho onde o arquivo de Produção está salvo.
   *
   * Passe o caminho para realizar a conversão para `base64`.
   *
   * ---
   *
   */
  certificadoProducaoPath?: string
}

function makeOptions<
  type extends EnvironmentTypes,
  operation extends OperationTypes | undefined,
>({ type, operation, data }: MakeOptionsProps<type, operation>) {
  if (!type) throw new Error('type is missing')
  if (
    ![
      'PIX',
      'DEFAULT',
      'OPENFINANCE',
      'PAGAMENTOS',
      'CONTAS',
      undefined,
    ].includes(operation)
  )
    throw new Error(
      'operation must be one of those: "PIX" | "DEFAULT" | "OPENFINANCE" | "PAGAMENTOS" | "CONTAS" | undefined = undefined',
    )

  const certificateHomologacao =
    data?.certificate ||
    (data?.certificateType === 'file'
      ? env.CERTIFICADO_HOMOLOGACAO_PATH
      : data?.certificateType === 'base64'
        ? env.CERTIFICADO_HOMOLOGACAO_BASE64
        : undefined)
  const certificateProducao =
    data?.certificate ||
    (data?.certificateType === 'file'
      ? env.CERTIFICADO_PRODUCAO_PATH
      : data?.certificateType === 'base64'
        ? env.CERTIFICADO_PRODUCAO_BASE64
        : undefined)

  const opt: Partial<Options<type, operation>> = {
    client_id: data?.client_id || env.CLIENT_ID_HOMOLOGACAO,
    client_secret: data?.client_secret || env.CLIENT_SECRET_HOMOLOGACAO,
    certificate:
      type === 'SANDBOX' ? certificateHomologacao : certificateProducao,
    certificateType: data?.certificateType || 'file',
  }

  if (!opt.client_id) throw new Error('property "client_id" is empty')
  if (!opt.client_secret) throw new Error('property "client_secret" is empty')
  if (!opt.certificate) throw new Error('property "certificate" is empty')
  if (!opt.certificateType)
    throw new Error('property "certificateType" is empty')

  return opt as Options<type, operation>
}

class EfiPay<type extends EnvironmentTypes> {
  #pix: PixRequest<type>
  #cobranca: CobrancaRequest<type>

  constructor(type: type, options?: OptionsCredentials) {
    const certificate = options?.certificate
    const clientId = options?.client_id
    const clientSecret = options?.client_secret
    const certificateType = options?.certificateType
    const validateMtls = options?.validateMtls

    this.#pix = new PixRequest({
      type,
      options: makeOptions({
        type,
        data: {
          certificate,
          client_id: clientId,
          client_secret: clientSecret,
          certificateType,
          validateMtls,
        },
      }),
    })

    this.#cobranca = new CobrancaRequest({
      type,
      options: makeOptions({
        type,
        data: {
          certificate,
          client_id: clientId,
          client_secret: clientSecret,
          certificateType,
          validateMtls,
        },
      }),
    })
  }

  /**
   * A API Pix Efí oferece recursos avançados para integração com sua aplicação, permitindo que você crie soluções personalizadas e ofereça opções de pagamento inovadoras aos seus clientes. Com nossa API é possível criar cobranças, verificar os Pix recebidos, devolver e enviar Pix.
   *
   * Para integrar a API Pix Efí ao seu sistema ou sua plataforma, é necessário ter uma Conta Digital Efí. Uma vez com acesso, você poderá obter as credenciais e o certificado necessários para a comunicação com a API Pix Efí.
   *
   * [Confira a Documentação oficial para mais detalhes](https://dev.efipay.com.br/docs/api-pix/credenciais)
   */
  get pix() {
    return this.#pix
  }

  /**
   *
   * ---
   *
   * A API Cobranças Efí oferece recursos avançados que permitem emitir diferentes tipos de cobranças, tais como **Boleto**, **Cartão de crédito**, **Carnê**, **Links de pagamento**, **Assinaturas (Recorrência)** e **Marketplace (Split de pagamento)**.
   *
   * Para integrar a API Cobranças Efí ao seu sistema ou sua plataforma, **é necessário ter uma Conta Digital Efí**. Após obter o acesso à conta, você poderá adquirir as credenciais necessárias para estabelecer a comunicação com a API Cobranças Efí.
   *
   * ---
   *
   * [Confira a Documentação oficial para mais detalhes](https://dev.efipay.com.br/docs/api-cobrancas/credenciais)
   *
   * ---
   *
   */
  get cobranca() {
    return this.#cobranca
  }

  /**
   *
   * ---
   *
   * Gera o arquivo `.env` na raiz do seu projeto com todas as variáveis de ambiente necessárias.
   *
   * Caso o `.env` já exista, escreve as variáveis de ambiente **depois do conteúdo existente**. Para sobrescrever o conteúdo existente, utilize a chame `mode` e passe o valor `overwrite`. Exemplo:
   *
   * ```ts
   * EfiPay.generateDotEnv({
   *  mode: 'overwrite'
   * })
   * ```
   *
   * ---
   *
   * ### Escrever as Variáveis de Ambiente
   *
   * Você pode passar os valores das variáveis de ambiente variáveis de ambiente através da chave `variables`. Exemplo:
   *
   * ```ts
   * EfiPay.generateDotEnv({
   *  variables: {
   *    CERTIFICADO_HOMOLOGACAO_PATH: './path/to/homologacao-certificate.(p12|pem)'
   *  }
   * })
   * ```
   *
   * ---
   *
   * As Variáveis de ambiente não informadas serão escritas com valores dummy padrão
   *
   * ---
   *
   * @param GenerateDotEnvProps
   */
  static generateDotEnv(props?: GenerateDotEnvProps) {
    const dotEnvData = `
    # CERTIFICATES ********************************************
    CERTIFICADO_HOMOLOGACAO_PATH="${props?.variables?.CERTIFICADO_HOMOLOGACAO_PATH || './path/to/homologacao-certificate.(p12|pem)'}"
    CERTIFICADO_PRODUCAO_PATH="${props?.variables?.CERTIFICADO_PRODUCAO_PATH || './path/to/producao-certificate.(p12|pem)'}"

    CERTIFICADO_HOMOLOGACAO_BASE64="${props?.variables?.CERTIFICADO_HOMOLOGACAO_BASE64 || 'base64_string_of_homologacao'}"
    CERTIFICADO_PRODUCAO_BASE64="${props?.variables?.CERTIFICADO_PRODUCAO_BASE64 || 'base64_string_of_producao'}"

    # CREDENTIALS ********************************************
    # HOMOLOGACAO
    CLIENT_ID_HOMOLOGACAO="${props?.variables?.CLIENT_ID_HOMOLOGACAO || 'Your_Client_Id_for_Homologacao'}"
    CLIENT_SECRET_HOMOLOGACAO="${props?.variables?.CLIENT_SECRET_HOMOLOGACAO || 'Your_Client_Secret_for_Homologacao'}"
    # PRODUCAO
    CLIENT_ID_PRODUCAO="${props?.variables?.CLIENT_ID_PRODUCAO || 'Your_Client_Id_for_Producao'}"
    CLIENT_SECRET_PRODUCAO="${props?.variables?.CLIENT_SECRET_PRODUCAO || 'Your_Client_Secret_for_Producao'}"
    
    
    # SUPPORT VARIABLES ********************************************

    # PIX
    PIX_KEY="${props?.variables?.PIX_KEY || 'you-pix-key--might-be-cpf-watsappNumber-or-randomkey-generated-by-efi-bank'}"

    # WEBHOOKS
    WEBHOOK_PIX="${props?.variables?.WEBHOOK_PIX || 'https://your-url/webhook/pix?ignorar=&hmac=your-custom-key'}"
    # ACCOUNT IDENTIFIER
    ACCOUNT_IDENTIFIER="${props?.variables?.ACCOUNT_IDENTIFIER || 'your_account_identifier'}"
    `
      .trim()
      .replaceAll(/  +/gi, '')

    const mode: GenerateDotEnvProps['mode'] = props?.mode || 'append'

    const fileName = '.env'
    const rootPath = './'
    const path = `${rootPath}${fileName}`

    const fileExists = existsSync(path)

    if (fileExists && mode === 'append') {
      const separator = `
      

      # *******************************************************************************************


      `.replaceAll(/  +/gi, '')

      writeFileSync(path, `${separator}${dotEnvData}`, { flag: 'a' })
    } else {
      writeFileSync(path, dotEnvData)
    }

    const creationMessage = `Arquivo "${path}" criado com sucesso!`
    const overwriteMessage = `Arquivo "${path}" sobrescrito com sucesso!`
    const appendMessage = `Dados adicionados no caminho "${path}" com sucesso!`

    const message = !fileExists
      ? creationMessage
      : mode === 'overwrite'
        ? overwriteMessage
        : appendMessage

    console.log(message)
  }

  /**
   *
   * ---
   *
   * Converte os certificados em  string `base64`
   *
   * Após a encodificação, salva os valores em **variáveis de ambiente** no arquivo `.env` na raiz do seu projeto. Caso o `.env` já exista, escreve **novas variáveis de ambiente** abaixo das existentes.
   *
   * ---
   *
   * @param GenerateBase64FromCertificateProps
   */
  static generateBase64FromCertificate({
    certificadoHomologacaoPath,
    certificadoProducaoPath,
  }: GenerateBase64FromCertificateProps) {
    if (!certificadoHomologacaoPath && !certificadoProducaoPath) {
      console.warn(
        `Atenção! Nenhum caminho de certificado foi informado, passe pelo menos um caminho de certificado para realizar a conversão`,
      )
      return
    }
    const homologacaoBuffer = certificadoHomologacaoPath
      ? readFileSync(certificadoHomologacaoPath)
      : undefined
    const producaoBuffer = certificadoProducaoPath
      ? readFileSync(certificadoProducaoPath)
      : undefined

    EfiPay.generateBase64FromBufferCertificate({
      certificadoHomologacaoBuffer: homologacaoBuffer,
      certificadoProducaoBuffer: producaoBuffer,
    })
  }

  /**
   *
   * ---
   *
   * Converte os certificados em formato `Buffer` para string `base64`
   *
   * Após a encodificação, salva os valores em **variáveis de ambiente** no arquivo `.env` na raiz do seu projeto. Caso o `.env` já exista, escreve **novas variáveis de ambiente** abaixo das existentes.
   *
   * ---
   *
   * @param CertificateFromBufferProps
   */
  static generateBase64FromBufferCertificate({
    certificadoHomologacaoBuffer,
    certificadoProducaoBuffer,
  }: CertificateFromBufferProps) {
    const homologacaoBase64 = certificadoHomologacaoBuffer
      ? certificadoHomologacaoBuffer.toString('base64')
      : undefined
    const producaoBase64 = certificadoProducaoBuffer
      ? certificadoProducaoBuffer.toString('base64')
      : undefined

    EfiPay.generateDotEnv({
      variables: {
        // CERTIFICATES ********************************************
        // FILE PATH
        CERTIFICADO_HOMOLOGACAO_PATH: env.CERTIFICADO_HOMOLOGACAO_PATH,
        CERTIFICADO_PRODUCAO_PATH: env.CERTIFICADO_PRODUCAO_PATH,
        // BASE64
        CERTIFICADO_HOMOLOGACAO_BASE64: homologacaoBase64,
        CERTIFICADO_PRODUCAO_BASE64: producaoBase64,

        // CREDENTIALS ********************************************
        // HOMOLOGACAO
        CLIENT_ID_HOMOLOGACAO: env.CLIENT_ID_HOMOLOGACAO,
        CLIENT_SECRET_HOMOLOGACAO: env.CLIENT_SECRET_HOMOLOGACAO,
        // PRODUCAO
        CLIENT_ID_PRODUCAO: env.CLIENT_ID_PRODUCAO,
        CLIENT_SECRET_PRODUCAO: env.CLIENT_SECRET_PRODUCAO,

        // SUPPORT VARIABLES ********************************************
        // PIX
        PIX_KEY: env.PIX_KEY,
        // WEBHOOKS
        WEBHOOK_PIX: env.WEBHOOK_PIX,
      },
    })
  }
}

export default EfiPay
