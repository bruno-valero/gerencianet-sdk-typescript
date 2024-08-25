import { PathLike } from 'node:fs';
import https from 'node:https';
import dayjs from 'dayjs';
import z from 'zod';

declare const constantsCallbacks: {
    readonly APIS: {
        readonly PIX: {
            readonly URL: {
                readonly PRODUCTION: "https://pix.api.efipay.com.br";
                readonly SANDBOX: "https://pix-h.api.efipay.com.br";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly pixCreateDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cobv/${string}`;
                    readonly method: "put";
                };
                readonly pixUpdateDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cobv/${string}`;
                    readonly method: "patch";
                };
                readonly pixDetailDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cobv/${string}`;
                    readonly method: "get";
                };
                readonly pixListDueCharges: () => {
                    readonly route: "/v2/cobv/";
                    readonly method: "get";
                };
                readonly createReport: () => {
                    readonly route: "/v2/gn/relatorios/extrato-conciliacao";
                    readonly method: "post";
                };
                readonly detailReport: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/v2/gn/relatorios/${string}`;
                    readonly method: "get";
                };
                readonly pixCreateCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cob/${string}`;
                    readonly method: "put";
                };
                readonly pixUpdateCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cob/${string}`;
                    readonly method: "patch";
                };
                readonly pixCreateImmediateCharge: () => {
                    readonly route: "/v2/cob";
                    readonly method: "post";
                };
                readonly pixDetailCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cob/${string}`;
                    readonly method: "get";
                };
                readonly pixListCharges: () => {
                    readonly route: "/v2/cob";
                    readonly method: "get";
                };
                readonly pixDetailReceived: ({ e2eId }: {
                    e2eId: string;
                }) => {
                    readonly route: `/v2/pix/${string}`;
                    readonly method: "get";
                };
                readonly pixReceivedList: () => {
                    readonly route: "/v2/pix";
                    readonly method: "get";
                };
                readonly pixSend: ({ idEnvio }: {
                    idEnvio: string;
                }) => {
                    readonly route: `/v2/gn/pix/${string}`;
                    readonly method: "put";
                };
                readonly pixSendDetail: ({ e2eId }: {
                    e2eId: string;
                }) => {
                    readonly route: `/v2/gn/pix/enviados/${string}`;
                    readonly method: "get";
                };
                readonly pixSendList: () => {
                    readonly route: "/v2/gn/pix/enviados";
                    readonly method: "get";
                };
                readonly pixDevolution: ({ id, e2eId }: {
                    id: string;
                    e2eId: string;
                }) => {
                    readonly route: `/v2/pix/${string}/devolucao/${string}`;
                    readonly method: "put";
                };
                readonly pixDetailDevolution: ({ id, e2eId }: {
                    id: string;
                    e2eId: string;
                }) => {
                    readonly route: `/v2/pix/${string}/devolucao/${string}`;
                    readonly method: "get";
                };
                readonly pixConfigWebhook: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/webhook/${string}`;
                    readonly method: "put";
                };
                readonly pixDetailWebhook: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/webhook/${string}`;
                    readonly method: "get";
                };
                readonly pixListWebhook: () => {
                    readonly route: "/v2/webhook";
                    readonly method: "get";
                };
                readonly pixDeleteWebhook: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/webhook/${string}`;
                    readonly method: "delete";
                };
                readonly pixCreateDueChargeBatch: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/lotecobv/${number}`;
                    readonly method: "put";
                };
                readonly pixUpdateDueChargeBatch: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/lotecobv/${number}`;
                    readonly method: "patch";
                };
                readonly pixDetailDueChargeBatch: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/lotecobv/${number}`;
                    readonly method: "get";
                };
                readonly pixListDueChargeBatch: () => {
                    readonly route: "/v2/lotecobv/";
                    readonly method: "get";
                };
                readonly pixCreateLocation: () => {
                    readonly route: "/v2/loc";
                    readonly method: "post";
                };
                readonly pixLocationList: () => {
                    readonly route: "/v2/loc";
                    readonly method: "get";
                };
                readonly pixDetailLocation: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/loc/${number}`;
                    readonly method: "get";
                };
                readonly pixGenerateQRCode: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/loc/${number}/qrcode`;
                    readonly method: "get";
                };
                readonly pixUnlinkTxidLocation: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/loc/${number}/txid`;
                    readonly method: "delete";
                };
                readonly pixCreateEvp: () => {
                    readonly route: "/v2/gn/evp";
                    readonly method: "post";
                };
                readonly pixListEvp: () => {
                    readonly route: "/v2/gn/evp";
                    readonly method: "get";
                };
                readonly pixDeleteEvp: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/gn/evp/${string}`;
                    readonly method: "delete";
                };
                readonly getAccountBalance: () => {
                    readonly route: "/v2/gn/saldo";
                    readonly method: "get";
                };
                readonly updateAccountConfig: () => {
                    readonly route: "/v2/gn/config";
                    readonly method: "put";
                };
                readonly listAccountConfig: () => {
                    readonly route: "/v2/gn/config";
                    readonly method: "get";
                };
                readonly pixSplitDetailCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cob/${string}`;
                    readonly method: "get";
                };
                readonly pixSplitLinkCharge: ({ txid, splitConfigId, }: {
                    txid: string;
                    splitConfigId: string;
                }) => {
                    readonly route: `/v2/gn/split/cob/${string}/vinculo/${string}`;
                    readonly method: "put";
                };
                readonly pixSplitUnlinkCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cob/${string}/vinculo`;
                    readonly method: "delete";
                };
                readonly pixSplitDetailDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cobv/${string}`;
                    readonly method: "get";
                };
                readonly pixSplitLinkDueCharge: ({ txid, splitConfigId, }: {
                    txid: string;
                    splitConfigId: string;
                }) => {
                    readonly route: `/v2/gn/split/cobv/${string}/vinculo/${string}`;
                    readonly method: "put";
                };
                readonly pixSplitUnlinkDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cobv/${string}/vinculo`;
                    readonly method: "delete";
                };
                readonly pixSplitConfig: () => {
                    readonly route: "/v2/gn/split/config";
                    readonly method: "post";
                };
                readonly pixSplitConfigId: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/v2/gn/split/config/${string}`;
                    readonly method: "put";
                };
                readonly pixSplitDetailConfig: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/v2/gn/split/config/${string}`;
                    readonly method: "get";
                };
                readonly pixSendDetailId: ({ idEnvio }: {
                    idEnvio: string;
                }) => {
                    readonly route: `/v2/gn/pix/enviados/id-envio/${string}`;
                    readonly method: "get";
                };
            };
        };
        readonly DEFAULT: {
            readonly URL: {
                readonly PRODUCTION: "https://api.gerencianet.com.br/v1";
                readonly SANDBOX: "https://sandbox.gerencianet.com.br/v1";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/authorize";
                    readonly method: "post";
                };
                readonly sendSubscriptionLinkEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/subscription/resend`;
                    readonly method: "post";
                };
                readonly oneStepSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}/subscription/one-step`;
                    readonly method: "post";
                };
                readonly settleCarnet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/settle`;
                    readonly method: "put";
                };
                readonly oneStepSubscriptionLink: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}/subscription/one-step/link`;
                    readonly method: "post";
                };
                readonly sendLinkEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link/resend`;
                    readonly method: "post";
                };
                readonly createOneStepLink: () => {
                    readonly route: "/charge/one-step/link";
                    readonly method: "post";
                };
                readonly createCharge: () => {
                    readonly route: "/charge";
                    readonly method: "post";
                };
                readonly detailCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}`;
                    readonly method: "get";
                };
                readonly updateChargeMetadata: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/metadata`;
                    readonly method: "put";
                };
                readonly updateBillet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/billet`;
                    readonly method: "put";
                };
                readonly definePayMethod: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/pay`;
                    readonly method: "post";
                };
                readonly cancelCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/cancel`;
                    readonly method: "put";
                };
                readonly createCarnet: () => {
                    readonly route: "/carnet";
                    readonly method: "post";
                };
                readonly detailCarnet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}`;
                    readonly method: "get";
                };
                readonly updateCarnetParcel: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}`;
                    readonly method: "put";
                };
                readonly updateCarnetMetadata: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/metadata`;
                    readonly method: "put";
                };
                readonly getNotification: ({ token }: {
                    token: string;
                }) => {
                    readonly route: `/notification/${string}`;
                    readonly method: "get";
                };
                readonly listPlans: () => {
                    readonly route: "/plans";
                    readonly method: "get";
                };
                readonly createPlan: () => {
                    readonly route: "/plan";
                    readonly method: "post";
                };
                readonly deletePlan: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}`;
                    readonly method: "delete";
                };
                readonly createSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}/subscription`;
                    readonly method: "post";
                };
                readonly detailSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}`;
                    readonly method: "get";
                };
                readonly defineSubscriptionPayMethod: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/pay`;
                    readonly method: "post";
                };
                readonly cancelSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/cancel`;
                    readonly method: "put";
                };
                readonly updateSubscriptionMetadata: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/metadata`;
                    readonly method: "put";
                };
                readonly getInstallments: () => {
                    readonly route: "/installments";
                    readonly method: "get";
                };
                readonly sendBilletEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/billet/resend`;
                    readonly method: "post";
                };
                readonly createChargeHistory: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/history`;
                    readonly method: "post";
                };
                readonly sendCarnetEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/resend`;
                    readonly method: "post";
                };
                readonly sendCarnetParcelEmail: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}/resend`;
                    readonly method: "post";
                };
                readonly createCarnetHistory: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/history`;
                    readonly method: "post";
                };
                readonly cancelCarnet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/cancel`;
                    readonly method: "put";
                };
                readonly cancelCarnetParcel: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}/cancel`;
                    readonly method: "put";
                };
                readonly linkCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link`;
                    readonly method: "post";
                };
                readonly defineLinkPayMethod: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link`;
                    readonly method: "post";
                };
                readonly updateChargeLink: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link`;
                    readonly method: "put";
                };
                readonly updatePlan: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}`;
                    readonly method: "put";
                };
                readonly createSubscriptionHistory: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/history`;
                    readonly method: "post";
                };
                readonly defineBalanceSheetBillet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/balance-sheet`;
                    readonly method: "post";
                };
                readonly settleCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/settle`;
                    readonly method: "put";
                };
                readonly settleCarnetParcel: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}/settle`;
                    readonly method: "put";
                };
                readonly createOneStepCharge: () => {
                    readonly route: "/charge/one-step";
                    readonly method: "post";
                };
            };
        };
        readonly OPENFINANCE: {
            readonly URL: {
                readonly PRODUCTION: "https://apis.gerencianet.com.br/open-finance";
                readonly SANDBOX: "https://apis-h.gerencianet.com.br/open-finance";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly ofListParticipants: () => {
                    readonly route: "/participantes/";
                    readonly method: "GET";
                };
                readonly ofStartPixPayment: () => {
                    readonly route: "/pagamentos/pix";
                    readonly method: "POST";
                };
                readonly ofListPixPayment: () => {
                    readonly route: "/pagamentos/pix";
                    readonly method: "GET";
                };
                readonly ofConfigUpdate: () => {
                    readonly route: "/config";
                    readonly method: "PUT";
                };
                readonly ofConfigDetail: () => {
                    readonly route: "/config";
                    readonly method: "GET";
                };
                readonly ofDevolutionPix: ({ identificadorPagamento, }: {
                    identificadorPagamento: string;
                }) => {
                    readonly route: `/pagamentos/pix/${string}/devolver`;
                    readonly method: "post";
                };
            };
        };
        readonly PAGAMENTOS: {
            readonly URL: {
                readonly PRODUCTION: "https://apis.gerencianet.com.br/pagamento";
                readonly SANDBOX: "https://apis-h.gerencianet.com.br/pagamento";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly payDetailBarCode: ({ codBarras }: {
                    codBarras: string;
                }) => {
                    readonly route: `/codBarras/${string}`;
                    readonly method: "GET";
                };
                readonly payRequestBarCode: ({ codBarras }: {
                    codBarras: string;
                }) => {
                    readonly route: `/codBarras/${string}`;
                    readonly method: "POST";
                };
                readonly payDetailPayment: ({ idPagamento }: {
                    idPagamento: string;
                }) => {
                    readonly route: `/${string}`;
                    readonly method: "GET";
                };
                readonly payListPayments: () => {
                    readonly route: "/resumo";
                    readonly method: "GET";
                };
            };
        };
        readonly CONTAS: {
            readonly URL: {
                readonly PRODUCTION: "https://apis.gerencianet.com.br";
                readonly SANDBOX: "https://apis-h.gerencianet.com.br";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly createAccount: () => {
                    readonly route: "/cadastro/conta-simplificada";
                    readonly method: "post";
                };
                readonly createAccountCertificate: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/conta-simplificada/${string}/certificado`;
                    readonly method: "post";
                };
                readonly getAccountCredentials: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/conta-simplificada/${string}/credenciais`;
                    readonly method: "get";
                };
                readonly accountConfigWebhook: () => {
                    readonly route: "/cadastro/webhook";
                    readonly method: "post";
                };
                readonly accountDeleteWebhook: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/webhook/${string}Webhook`;
                    readonly method: "delete";
                };
                readonly accountDetailWebhook: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/webhook/${string}Webhook`;
                    readonly method: "get";
                };
                readonly accountListWebhook: () => {
                    readonly route: "/cadastro/webhooks";
                    readonly method: "get";
                };
            };
        };
    };
};
type ConstantsCallbacks = typeof constantsCallbacks;
type OperationTypes = keyof ConstantsCallbacks['APIS'];
type Auth$1<key extends OperationTypes> = ReturnType<ConstantsCallbacks['APIS'][key]['ENDPOINTS']['authorize']>;
type EnvironmentTypes = 'PRODUCTION' | 'SANDBOX';
type AuthRoute<key extends OperationTypes | undefined = undefined> = key extends undefined ? Auth$1<'PIX'> | Auth$1<'DEFAULT'> | Auth$1<'OPENFINANCE'> | Auth$1<'PAGAMENTOS'> | Auth$1<'CONTAS'> : key extends OperationTypes ? Auth$1<key> : void;
type UrlBase<type extends OperationTypes, operation extends EnvironmentTypes> = ConstantsCallbacks['APIS'][type]['URL'][operation];
type BaseUrl<operation extends EnvironmentTypes, type extends OperationTypes | undefined = undefined> = type extends undefined ? UrlBase<'PIX', operation> | UrlBase<'DEFAULT', operation> | UrlBase<'OPENFINANCE', operation> | UrlBase<'PAGAMENTOS', operation> | UrlBase<'CONTAS', operation> : type extends OperationTypes ? UrlBase<type, operation> : void;

type CertificateType = 'file' | 'base64' | 'buffer'

interface EfiConfig<
  type extends EnvironmentTypes,
  operation extends OperationTypes | undefined = undefined,
> {
  client_id: string
  client_secret: string
  certificateType: CertificateType
  certificate?: PathLike | string | Buffer
  pemKey?: PathLike | string | Buffer
  sandbox: boolean
  partnerToken?: string
  rawResponse?: unknown
  baseUrl?: BaseUrl<type, operation>
  validateMtls?: boolean
  authRoute?: AuthRoute<operation>
  agent?: https.Agent
}

/**
 * Make some property optional on type
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Optional<Post, 'id' | 'email'>
 * ```
 **/
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type TokenType =
  | 'Bearer'
  | 'Basic'
  | 'Digest'
  | 'Hawk'
  | 'ApiKey'
  | 'MAC'
  | 'AWS4-HMAC-SHA256'

type PixAuthResponse = {
  access_token: string
  token_type: TokenType
  expires_in: number
  scope: string
} | null
type DefaultAuthResponse = {
  access_token: string
  token_type: TokenType
  expires_in: number
  scope: string
} | null
type OpenFinanceAuthResponse = {
  access_token: string
  token_type: TokenType
  expires_in: number
  scope: string
} | null
type PagamentosAuthResponse = {
  access_token: string
  token_type: TokenType
  expires_in: number
  scope: string
} | null
type ContasAuthResponse = {
  access_token: string
  token_type: TokenType
  expires_in: number
  scope: string
} | null

type GetAccessTokenResponse<operation extends OperationTypes> = {
  PIX: PixAuthResponse
  DEFAULT: DefaultAuthResponse
  OPENFINANCE: OpenFinanceAuthResponse
  PAGAMENTOS: PagamentosAuthResponse
  CONTAS: ContasAuthResponse
}[operation]

declare class Auth<type extends EnvironmentTypes, operation extends OperationTypes> {
    #private;
    private constants;
    private client_id;
    private client_secret;
    private baseUrl?;
    private agent;
    private authRoute;
    constructor(options: EfiConfig<type, operation>);
    get options(): EfiConfig<type, operation>;
    getAccessToken(): Promise<GetAccessTokenResponse<operation>>;
    getAgent(): https.Agent | undefined;
}

type ConstructorSingleParameters<T extends abstract new (arg: unknown) => unknown> = T extends abstract new (arg: infer P) => unknown ? P : never;
type SearchParamsType = Record<string, string | number | Date | boolean>;
declare abstract class ApiRequest<type extends EnvironmentTypes, operation extends OperationTypes> {
    #private;
    constructor(type: type, operation: operation, options: Optional<EfiConfig<type, operation>, 'sandbox' | 'certificateType'>);
    protected get type(): type;
    protected get operation(): operation;
    protected get environment(): "PRODUCTION" | "SANDBOX";
    protected get endpoints(): {
        readonly PIX: {
            readonly URL: {
                readonly PRODUCTION: "https://pix.api.efipay.com.br";
                readonly SANDBOX: "https://pix-h.api.efipay.com.br";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly pixCreateDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cobv/${string}`;
                    readonly method: "put";
                };
                readonly pixUpdateDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cobv/${string}`;
                    readonly method: "patch";
                };
                readonly pixDetailDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cobv/${string}`;
                    readonly method: "get";
                };
                readonly pixListDueCharges: () => {
                    readonly route: "/v2/cobv/";
                    readonly method: "get";
                };
                readonly createReport: () => {
                    readonly route: "/v2/gn/relatorios/extrato-conciliacao";
                    readonly method: "post";
                };
                readonly detailReport: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/v2/gn/relatorios/${string}`;
                    readonly method: "get";
                };
                readonly pixCreateCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cob/${string}`;
                    readonly method: "put";
                };
                readonly pixUpdateCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cob/${string}`;
                    readonly method: "patch";
                };
                readonly pixCreateImmediateCharge: () => {
                    readonly route: "/v2/cob";
                    readonly method: "post";
                };
                readonly pixDetailCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cob/${string}`;
                    readonly method: "get";
                };
                readonly pixListCharges: () => {
                    readonly route: "/v2/cob";
                    readonly method: "get";
                };
                readonly pixDetailReceived: ({ e2eId }: {
                    e2eId: string;
                }) => {
                    readonly route: `/v2/pix/${string}`;
                    readonly method: "get";
                };
                readonly pixReceivedList: () => {
                    readonly route: "/v2/pix";
                    readonly method: "get";
                };
                readonly pixSend: ({ idEnvio }: {
                    idEnvio: string;
                }) => {
                    readonly route: `/v2/gn/pix/${string}`;
                    readonly method: "put";
                };
                readonly pixSendDetail: ({ e2eId }: {
                    e2eId: string;
                }) => {
                    readonly route: `/v2/gn/pix/enviados/${string}`;
                    readonly method: "get";
                };
                readonly pixSendList: () => {
                    readonly route: "/v2/gn/pix/enviados";
                    readonly method: "get";
                };
                readonly pixDevolution: ({ id, e2eId }: {
                    id: string;
                    e2eId: string;
                }) => {
                    readonly route: `/v2/pix/${string}/devolucao/${string}`;
                    readonly method: "put";
                };
                readonly pixDetailDevolution: ({ id, e2eId }: {
                    id: string;
                    e2eId: string;
                }) => {
                    readonly route: `/v2/pix/${string}/devolucao/${string}`;
                    readonly method: "get";
                };
                readonly pixConfigWebhook: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/webhook/${string}`;
                    readonly method: "put";
                };
                readonly pixDetailWebhook: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/webhook/${string}`;
                    readonly method: "get";
                };
                readonly pixListWebhook: () => {
                    readonly route: "/v2/webhook";
                    readonly method: "get";
                };
                readonly pixDeleteWebhook: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/webhook/${string}`;
                    readonly method: "delete";
                };
                readonly pixCreateDueChargeBatch: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/lotecobv/${number}`;
                    readonly method: "put";
                };
                readonly pixUpdateDueChargeBatch: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/lotecobv/${number}`;
                    readonly method: "patch";
                };
                readonly pixDetailDueChargeBatch: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/lotecobv/${number}`;
                    readonly method: "get";
                };
                readonly pixListDueChargeBatch: () => {
                    readonly route: "/v2/lotecobv/";
                    readonly method: "get";
                };
                readonly pixCreateLocation: () => {
                    readonly route: "/v2/loc";
                    readonly method: "post";
                };
                readonly pixLocationList: () => {
                    readonly route: "/v2/loc";
                    readonly method: "get";
                };
                readonly pixDetailLocation: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/loc/${number}`;
                    readonly method: "get";
                };
                readonly pixGenerateQRCode: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/loc/${number}/qrcode`;
                    readonly method: "get";
                };
                readonly pixUnlinkTxidLocation: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/loc/${number}/txid`;
                    readonly method: "delete";
                };
                readonly pixCreateEvp: () => {
                    readonly route: "/v2/gn/evp";
                    readonly method: "post";
                };
                readonly pixListEvp: () => {
                    readonly route: "/v2/gn/evp";
                    readonly method: "get";
                };
                readonly pixDeleteEvp: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/gn/evp/${string}`;
                    readonly method: "delete";
                };
                readonly getAccountBalance: () => {
                    readonly route: "/v2/gn/saldo";
                    readonly method: "get";
                };
                readonly updateAccountConfig: () => {
                    readonly route: "/v2/gn/config";
                    readonly method: "put";
                };
                readonly listAccountConfig: () => {
                    readonly route: "/v2/gn/config";
                    readonly method: "get";
                };
                readonly pixSplitDetailCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cob/${string}`;
                    readonly method: "get";
                };
                readonly pixSplitLinkCharge: ({ txid, splitConfigId, }: {
                    txid: string;
                    splitConfigId: string;
                }) => {
                    readonly route: `/v2/gn/split/cob/${string}/vinculo/${string}`;
                    readonly method: "put";
                };
                readonly pixSplitUnlinkCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cob/${string}/vinculo`;
                    readonly method: "delete";
                };
                readonly pixSplitDetailDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cobv/${string}`;
                    readonly method: "get";
                };
                readonly pixSplitLinkDueCharge: ({ txid, splitConfigId, }: {
                    txid: string;
                    splitConfigId: string;
                }) => {
                    readonly route: `/v2/gn/split/cobv/${string}/vinculo/${string}`;
                    readonly method: "put";
                };
                readonly pixSplitUnlinkDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cobv/${string}/vinculo`;
                    readonly method: "delete";
                };
                readonly pixSplitConfig: () => {
                    readonly route: "/v2/gn/split/config";
                    readonly method: "post";
                };
                readonly pixSplitConfigId: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/v2/gn/split/config/${string}`;
                    readonly method: "put";
                };
                readonly pixSplitDetailConfig: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/v2/gn/split/config/${string}`;
                    readonly method: "get";
                };
                readonly pixSendDetailId: ({ idEnvio }: {
                    idEnvio: string;
                }) => {
                    readonly route: `/v2/gn/pix/enviados/id-envio/${string}`;
                    readonly method: "get";
                };
            };
        };
        readonly DEFAULT: {
            readonly URL: {
                readonly PRODUCTION: "https://api.gerencianet.com.br/v1";
                readonly SANDBOX: "https://sandbox.gerencianet.com.br/v1";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/authorize";
                    readonly method: "post";
                };
                readonly sendSubscriptionLinkEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/subscription/resend`;
                    readonly method: "post";
                };
                readonly oneStepSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}/subscription/one-step`;
                    readonly method: "post";
                };
                readonly settleCarnet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/settle`;
                    readonly method: "put";
                };
                readonly oneStepSubscriptionLink: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}/subscription/one-step/link`;
                    readonly method: "post";
                };
                readonly sendLinkEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link/resend`;
                    readonly method: "post";
                };
                readonly createOneStepLink: () => {
                    readonly route: "/charge/one-step/link";
                    readonly method: "post";
                };
                readonly createCharge: () => {
                    readonly route: "/charge";
                    readonly method: "post";
                };
                readonly detailCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}`;
                    readonly method: "get";
                };
                readonly updateChargeMetadata: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/metadata`;
                    readonly method: "put";
                };
                readonly updateBillet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/billet`;
                    readonly method: "put";
                };
                readonly definePayMethod: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/pay`;
                    readonly method: "post";
                };
                readonly cancelCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/cancel`;
                    readonly method: "put";
                };
                readonly createCarnet: () => {
                    readonly route: "/carnet";
                    readonly method: "post";
                };
                readonly detailCarnet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}`;
                    readonly method: "get";
                };
                readonly updateCarnetParcel: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}`;
                    readonly method: "put";
                };
                readonly updateCarnetMetadata: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/metadata`;
                    readonly method: "put";
                };
                readonly getNotification: ({ token }: {
                    token: string;
                }) => {
                    readonly route: `/notification/${string}`;
                    readonly method: "get";
                };
                readonly listPlans: () => {
                    readonly route: "/plans";
                    readonly method: "get";
                };
                readonly createPlan: () => {
                    readonly route: "/plan";
                    readonly method: "post";
                };
                readonly deletePlan: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}`;
                    readonly method: "delete";
                };
                readonly createSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}/subscription`;
                    readonly method: "post";
                };
                readonly detailSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}`;
                    readonly method: "get";
                };
                readonly defineSubscriptionPayMethod: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/pay`;
                    readonly method: "post";
                };
                readonly cancelSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/cancel`;
                    readonly method: "put";
                };
                readonly updateSubscriptionMetadata: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/metadata`;
                    readonly method: "put";
                };
                readonly getInstallments: () => {
                    readonly route: "/installments";
                    readonly method: "get";
                };
                readonly sendBilletEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/billet/resend`;
                    readonly method: "post";
                };
                readonly createChargeHistory: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/history`;
                    readonly method: "post";
                };
                readonly sendCarnetEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/resend`;
                    readonly method: "post";
                };
                readonly sendCarnetParcelEmail: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}/resend`;
                    readonly method: "post";
                };
                readonly createCarnetHistory: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/history`;
                    readonly method: "post";
                };
                readonly cancelCarnet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/cancel`;
                    readonly method: "put";
                };
                readonly cancelCarnetParcel: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}/cancel`;
                    readonly method: "put";
                };
                readonly linkCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link`;
                    readonly method: "post";
                };
                readonly defineLinkPayMethod: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link`;
                    readonly method: "post";
                };
                readonly updateChargeLink: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link`;
                    readonly method: "put";
                };
                readonly updatePlan: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}`;
                    readonly method: "put";
                };
                readonly createSubscriptionHistory: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/history`;
                    readonly method: "post";
                };
                readonly defineBalanceSheetBillet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/balance-sheet`;
                    readonly method: "post";
                };
                readonly settleCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/settle`;
                    readonly method: "put";
                };
                readonly settleCarnetParcel: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}/settle`;
                    readonly method: "put";
                };
                readonly createOneStepCharge: () => {
                    readonly route: "/charge/one-step";
                    readonly method: "post";
                };
            };
        };
        readonly OPENFINANCE: {
            readonly URL: {
                readonly PRODUCTION: "https://apis.gerencianet.com.br/open-finance";
                readonly SANDBOX: "https://apis-h.gerencianet.com.br/open-finance";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly ofListParticipants: () => {
                    readonly route: "/participantes/";
                    readonly method: "GET";
                };
                readonly ofStartPixPayment: () => {
                    readonly route: "/pagamentos/pix";
                    readonly method: "POST";
                };
                readonly ofListPixPayment: () => {
                    readonly route: "/pagamentos/pix";
                    readonly method: "GET";
                };
                readonly ofConfigUpdate: () => {
                    readonly route: "/config";
                    readonly method: "PUT";
                };
                readonly ofConfigDetail: () => {
                    readonly route: "/config";
                    readonly method: "GET";
                };
                readonly ofDevolutionPix: ({ identificadorPagamento, }: {
                    identificadorPagamento: string;
                }) => {
                    readonly route: `/pagamentos/pix/${string}/devolver`;
                    readonly method: "post";
                };
            };
        };
        readonly PAGAMENTOS: {
            readonly URL: {
                readonly PRODUCTION: "https://apis.gerencianet.com.br/pagamento";
                readonly SANDBOX: "https://apis-h.gerencianet.com.br/pagamento";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly payDetailBarCode: ({ codBarras }: {
                    codBarras: string;
                }) => {
                    readonly route: `/codBarras/${string}`;
                    readonly method: "GET";
                };
                readonly payRequestBarCode: ({ codBarras }: {
                    codBarras: string;
                }) => {
                    readonly route: `/codBarras/${string}`;
                    readonly method: "POST";
                };
                readonly payDetailPayment: ({ idPagamento }: {
                    idPagamento: string;
                }) => {
                    readonly route: `/${string}`;
                    readonly method: "GET";
                };
                readonly payListPayments: () => {
                    readonly route: "/resumo";
                    readonly method: "GET";
                };
            };
        };
        readonly CONTAS: {
            readonly URL: {
                readonly PRODUCTION: "https://apis.gerencianet.com.br";
                readonly SANDBOX: "https://apis-h.gerencianet.com.br";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly createAccount: () => {
                    readonly route: "/cadastro/conta-simplificada";
                    readonly method: "post";
                };
                readonly createAccountCertificate: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/conta-simplificada/${string}/certificado`;
                    readonly method: "post";
                };
                readonly getAccountCredentials: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/conta-simplificada/${string}/credenciais`;
                    readonly method: "get";
                };
                readonly accountConfigWebhook: () => {
                    readonly route: "/cadastro/webhook";
                    readonly method: "post";
                };
                readonly accountDeleteWebhook: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/webhook/${string}Webhook`;
                    readonly method: "delete";
                };
                readonly accountDetailWebhook: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/webhook/${string}Webhook`;
                    readonly method: "get";
                };
                readonly accountListWebhook: () => {
                    readonly route: "/cadastro/webhooks";
                    readonly method: "get";
                };
            };
        };
    }[operation];
    protected get options(): EfiConfig<type, operation>;
    protected get auth(): Auth<type, operation>;
    protected get baseUrl(): {
        readonly PIX: {
            readonly URL: {
                readonly PRODUCTION: "https://pix.api.efipay.com.br";
                readonly SANDBOX: "https://pix-h.api.efipay.com.br";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly pixCreateDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cobv/${string}`;
                    readonly method: "put";
                };
                readonly pixUpdateDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cobv/${string}`;
                    readonly method: "patch";
                };
                readonly pixDetailDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cobv/${string}`;
                    readonly method: "get";
                };
                readonly pixListDueCharges: () => {
                    readonly route: "/v2/cobv/";
                    readonly method: "get";
                };
                readonly createReport: () => {
                    readonly route: "/v2/gn/relatorios/extrato-conciliacao";
                    readonly method: "post";
                };
                readonly detailReport: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/v2/gn/relatorios/${string}`;
                    readonly method: "get";
                };
                readonly pixCreateCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cob/${string}`;
                    readonly method: "put";
                };
                readonly pixUpdateCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cob/${string}`;
                    readonly method: "patch";
                };
                readonly pixCreateImmediateCharge: () => {
                    readonly route: "/v2/cob";
                    readonly method: "post";
                };
                readonly pixDetailCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/cob/${string}`;
                    readonly method: "get";
                };
                readonly pixListCharges: () => {
                    readonly route: "/v2/cob";
                    readonly method: "get";
                };
                readonly pixDetailReceived: ({ e2eId }: {
                    e2eId: string;
                }) => {
                    readonly route: `/v2/pix/${string}`;
                    readonly method: "get";
                };
                readonly pixReceivedList: () => {
                    readonly route: "/v2/pix";
                    readonly method: "get";
                };
                readonly pixSend: ({ idEnvio }: {
                    idEnvio: string;
                }) => {
                    readonly route: `/v2/gn/pix/${string}`;
                    readonly method: "put";
                };
                readonly pixSendDetail: ({ e2eId }: {
                    e2eId: string;
                }) => {
                    readonly route: `/v2/gn/pix/enviados/${string}`;
                    readonly method: "get";
                };
                readonly pixSendList: () => {
                    readonly route: "/v2/gn/pix/enviados";
                    readonly method: "get";
                };
                readonly pixDevolution: ({ id, e2eId }: {
                    id: string;
                    e2eId: string;
                }) => {
                    readonly route: `/v2/pix/${string}/devolucao/${string}`;
                    readonly method: "put";
                };
                readonly pixDetailDevolution: ({ id, e2eId }: {
                    id: string;
                    e2eId: string;
                }) => {
                    readonly route: `/v2/pix/${string}/devolucao/${string}`;
                    readonly method: "get";
                };
                readonly pixConfigWebhook: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/webhook/${string}`;
                    readonly method: "put";
                };
                readonly pixDetailWebhook: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/webhook/${string}`;
                    readonly method: "get";
                };
                readonly pixListWebhook: () => {
                    readonly route: "/v2/webhook";
                    readonly method: "get";
                };
                readonly pixDeleteWebhook: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/webhook/${string}`;
                    readonly method: "delete";
                };
                readonly pixCreateDueChargeBatch: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/lotecobv/${number}`;
                    readonly method: "put";
                };
                readonly pixUpdateDueChargeBatch: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/lotecobv/${number}`;
                    readonly method: "patch";
                };
                readonly pixDetailDueChargeBatch: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/lotecobv/${number}`;
                    readonly method: "get";
                };
                readonly pixListDueChargeBatch: () => {
                    readonly route: "/v2/lotecobv/";
                    readonly method: "get";
                };
                readonly pixCreateLocation: () => {
                    readonly route: "/v2/loc";
                    readonly method: "post";
                };
                readonly pixLocationList: () => {
                    readonly route: "/v2/loc";
                    readonly method: "get";
                };
                readonly pixDetailLocation: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/loc/${number}`;
                    readonly method: "get";
                };
                readonly pixGenerateQRCode: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/loc/${number}/qrcode`;
                    readonly method: "get";
                };
                readonly pixUnlinkTxidLocation: ({ id }: {
                    id: number;
                }) => {
                    readonly route: `/v2/loc/${number}/txid`;
                    readonly method: "delete";
                };
                readonly pixCreateEvp: () => {
                    readonly route: "/v2/gn/evp";
                    readonly method: "post";
                };
                readonly pixListEvp: () => {
                    readonly route: "/v2/gn/evp";
                    readonly method: "get";
                };
                readonly pixDeleteEvp: ({ chave }: {
                    chave: string;
                }) => {
                    readonly route: `/v2/gn/evp/${string}`;
                    readonly method: "delete";
                };
                readonly getAccountBalance: () => {
                    readonly route: "/v2/gn/saldo";
                    readonly method: "get";
                };
                readonly updateAccountConfig: () => {
                    readonly route: "/v2/gn/config";
                    readonly method: "put";
                };
                readonly listAccountConfig: () => {
                    readonly route: "/v2/gn/config";
                    readonly method: "get";
                };
                readonly pixSplitDetailCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cob/${string}`;
                    readonly method: "get";
                };
                readonly pixSplitLinkCharge: ({ txid, splitConfigId, }: {
                    txid: string;
                    splitConfigId: string;
                }) => {
                    readonly route: `/v2/gn/split/cob/${string}/vinculo/${string}`;
                    readonly method: "put";
                };
                readonly pixSplitUnlinkCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cob/${string}/vinculo`;
                    readonly method: "delete";
                };
                readonly pixSplitDetailDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cobv/${string}`;
                    readonly method: "get";
                };
                readonly pixSplitLinkDueCharge: ({ txid, splitConfigId, }: {
                    txid: string;
                    splitConfigId: string;
                }) => {
                    readonly route: `/v2/gn/split/cobv/${string}/vinculo/${string}`;
                    readonly method: "put";
                };
                readonly pixSplitUnlinkDueCharge: ({ txid }: {
                    txid: string;
                }) => {
                    readonly route: `/v2/gn/split/cobv/${string}/vinculo`;
                    readonly method: "delete";
                };
                readonly pixSplitConfig: () => {
                    readonly route: "/v2/gn/split/config";
                    readonly method: "post";
                };
                readonly pixSplitConfigId: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/v2/gn/split/config/${string}`;
                    readonly method: "put";
                };
                readonly pixSplitDetailConfig: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/v2/gn/split/config/${string}`;
                    readonly method: "get";
                };
                readonly pixSendDetailId: ({ idEnvio }: {
                    idEnvio: string;
                }) => {
                    readonly route: `/v2/gn/pix/enviados/id-envio/${string}`;
                    readonly method: "get";
                };
            };
        };
        readonly DEFAULT: {
            readonly URL: {
                readonly PRODUCTION: "https://api.gerencianet.com.br/v1";
                readonly SANDBOX: "https://sandbox.gerencianet.com.br/v1";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/authorize";
                    readonly method: "post";
                };
                readonly sendSubscriptionLinkEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/subscription/resend`;
                    readonly method: "post";
                };
                readonly oneStepSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}/subscription/one-step`;
                    readonly method: "post";
                };
                readonly settleCarnet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/settle`;
                    readonly method: "put";
                };
                readonly oneStepSubscriptionLink: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}/subscription/one-step/link`;
                    readonly method: "post";
                };
                readonly sendLinkEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link/resend`;
                    readonly method: "post";
                };
                readonly createOneStepLink: () => {
                    readonly route: "/charge/one-step/link";
                    readonly method: "post";
                };
                readonly createCharge: () => {
                    readonly route: "/charge";
                    readonly method: "post";
                };
                readonly detailCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}`;
                    readonly method: "get";
                };
                readonly updateChargeMetadata: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/metadata`;
                    readonly method: "put";
                };
                readonly updateBillet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/billet`;
                    readonly method: "put";
                };
                readonly definePayMethod: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/pay`;
                    readonly method: "post";
                };
                readonly cancelCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/cancel`;
                    readonly method: "put";
                };
                readonly createCarnet: () => {
                    readonly route: "/carnet";
                    readonly method: "post";
                };
                readonly detailCarnet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}`;
                    readonly method: "get";
                };
                readonly updateCarnetParcel: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}`;
                    readonly method: "put";
                };
                readonly updateCarnetMetadata: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/metadata`;
                    readonly method: "put";
                };
                readonly getNotification: ({ token }: {
                    token: string;
                }) => {
                    readonly route: `/notification/${string}`;
                    readonly method: "get";
                };
                readonly listPlans: () => {
                    readonly route: "/plans";
                    readonly method: "get";
                };
                readonly createPlan: () => {
                    readonly route: "/plan";
                    readonly method: "post";
                };
                readonly deletePlan: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}`;
                    readonly method: "delete";
                };
                readonly createSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}/subscription`;
                    readonly method: "post";
                };
                readonly detailSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}`;
                    readonly method: "get";
                };
                readonly defineSubscriptionPayMethod: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/pay`;
                    readonly method: "post";
                };
                readonly cancelSubscription: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/cancel`;
                    readonly method: "put";
                };
                readonly updateSubscriptionMetadata: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/metadata`;
                    readonly method: "put";
                };
                readonly getInstallments: () => {
                    readonly route: "/installments";
                    readonly method: "get";
                };
                readonly sendBilletEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/billet/resend`;
                    readonly method: "post";
                };
                readonly createChargeHistory: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/history`;
                    readonly method: "post";
                };
                readonly sendCarnetEmail: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/resend`;
                    readonly method: "post";
                };
                readonly sendCarnetParcelEmail: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}/resend`;
                    readonly method: "post";
                };
                readonly createCarnetHistory: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/history`;
                    readonly method: "post";
                };
                readonly cancelCarnet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/carnet/${string}/cancel`;
                    readonly method: "put";
                };
                readonly cancelCarnetParcel: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}/cancel`;
                    readonly method: "put";
                };
                readonly linkCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link`;
                    readonly method: "post";
                };
                readonly defineLinkPayMethod: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link`;
                    readonly method: "post";
                };
                readonly updateChargeLink: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/link`;
                    readonly method: "put";
                };
                readonly updatePlan: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/plan/${string}`;
                    readonly method: "put";
                };
                readonly createSubscriptionHistory: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/subscription/${string}/history`;
                    readonly method: "post";
                };
                readonly defineBalanceSheetBillet: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/balance-sheet`;
                    readonly method: "post";
                };
                readonly settleCharge: ({ id }: {
                    id: string;
                }) => {
                    readonly route: `/charge/${string}/settle`;
                    readonly method: "put";
                };
                readonly settleCarnetParcel: ({ id, parcel }: {
                    id: string;
                    parcel: string;
                }) => {
                    readonly route: `/carnet/${string}/parcel/${string}/settle`;
                    readonly method: "put";
                };
                readonly createOneStepCharge: () => {
                    readonly route: "/charge/one-step";
                    readonly method: "post";
                };
            };
        };
        readonly OPENFINANCE: {
            readonly URL: {
                readonly PRODUCTION: "https://apis.gerencianet.com.br/open-finance";
                readonly SANDBOX: "https://apis-h.gerencianet.com.br/open-finance";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly ofListParticipants: () => {
                    readonly route: "/participantes/";
                    readonly method: "GET";
                };
                readonly ofStartPixPayment: () => {
                    readonly route: "/pagamentos/pix";
                    readonly method: "POST";
                };
                readonly ofListPixPayment: () => {
                    readonly route: "/pagamentos/pix";
                    readonly method: "GET";
                };
                readonly ofConfigUpdate: () => {
                    readonly route: "/config";
                    readonly method: "PUT";
                };
                readonly ofConfigDetail: () => {
                    readonly route: "/config";
                    readonly method: "GET";
                };
                readonly ofDevolutionPix: ({ identificadorPagamento, }: {
                    identificadorPagamento: string;
                }) => {
                    readonly route: `/pagamentos/pix/${string}/devolver`;
                    readonly method: "post";
                };
            };
        };
        readonly PAGAMENTOS: {
            readonly URL: {
                readonly PRODUCTION: "https://apis.gerencianet.com.br/pagamento";
                readonly SANDBOX: "https://apis-h.gerencianet.com.br/pagamento";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly payDetailBarCode: ({ codBarras }: {
                    codBarras: string;
                }) => {
                    readonly route: `/codBarras/${string}`;
                    readonly method: "GET";
                };
                readonly payRequestBarCode: ({ codBarras }: {
                    codBarras: string;
                }) => {
                    readonly route: `/codBarras/${string}`;
                    readonly method: "POST";
                };
                readonly payDetailPayment: ({ idPagamento }: {
                    idPagamento: string;
                }) => {
                    readonly route: `/${string}`;
                    readonly method: "GET";
                };
                readonly payListPayments: () => {
                    readonly route: "/resumo";
                    readonly method: "GET";
                };
            };
        };
        readonly CONTAS: {
            readonly URL: {
                readonly PRODUCTION: "https://apis.gerencianet.com.br";
                readonly SANDBOX: "https://apis-h.gerencianet.com.br";
            };
            readonly ENDPOINTS: {
                readonly authorize: () => {
                    readonly route: "/oauth/token";
                    readonly method: "post";
                };
                readonly createAccount: () => {
                    readonly route: "/cadastro/conta-simplificada";
                    readonly method: "post";
                };
                readonly createAccountCertificate: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/conta-simplificada/${string}/certificado`;
                    readonly method: "post";
                };
                readonly getAccountCredentials: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/conta-simplificada/${string}/credenciais`;
                    readonly method: "get";
                };
                readonly accountConfigWebhook: () => {
                    readonly route: "/cadastro/webhook";
                    readonly method: "post";
                };
                readonly accountDeleteWebhook: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/webhook/${string}Webhook`;
                    readonly method: "delete";
                };
                readonly accountDetailWebhook: ({ identificador }: {
                    identificador: string;
                }) => {
                    readonly route: `/cadastro/webhook/${string}Webhook`;
                    readonly method: "get";
                };
                readonly accountListWebhook: () => {
                    readonly route: "/cadastro/webhooks";
                    readonly method: "get";
                };
            };
        };
    }[operation]["URL"][type];
    get config(): {
        environment: string;
        endpoints: {
            readonly PIX: {
                readonly URL: {
                    readonly PRODUCTION: "https://pix.api.efipay.com.br";
                    readonly SANDBOX: "https://pix-h.api.efipay.com.br";
                };
                readonly ENDPOINTS: {
                    readonly authorize: () => {
                        readonly route: "/oauth/token";
                        readonly method: "post";
                    };
                    readonly pixCreateDueCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cobv/${string}`;
                        readonly method: "put";
                    };
                    readonly pixUpdateDueCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cobv/${string}`;
                        readonly method: "patch";
                    };
                    readonly pixDetailDueCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cobv/${string}`;
                        readonly method: "get";
                    };
                    readonly pixListDueCharges: () => {
                        readonly route: "/v2/cobv/";
                        readonly method: "get";
                    };
                    readonly createReport: () => {
                        readonly route: "/v2/gn/relatorios/extrato-conciliacao";
                        readonly method: "post";
                    };
                    readonly detailReport: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/v2/gn/relatorios/${string}`;
                        readonly method: "get";
                    };
                    readonly pixCreateCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cob/${string}`;
                        readonly method: "put";
                    };
                    readonly pixUpdateCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cob/${string}`;
                        readonly method: "patch";
                    };
                    readonly pixCreateImmediateCharge: () => {
                        readonly route: "/v2/cob";
                        readonly method: "post";
                    };
                    readonly pixDetailCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cob/${string}`;
                        readonly method: "get";
                    };
                    readonly pixListCharges: () => {
                        readonly route: "/v2/cob";
                        readonly method: "get";
                    };
                    readonly pixDetailReceived: ({ e2eId }: {
                        e2eId: string;
                    }) => {
                        readonly route: `/v2/pix/${string}`;
                        readonly method: "get";
                    };
                    readonly pixReceivedList: () => {
                        readonly route: "/v2/pix";
                        readonly method: "get";
                    };
                    readonly pixSend: ({ idEnvio }: {
                        idEnvio: string;
                    }) => {
                        readonly route: `/v2/gn/pix/${string}`;
                        readonly method: "put";
                    };
                    readonly pixSendDetail: ({ e2eId }: {
                        e2eId: string;
                    }) => {
                        readonly route: `/v2/gn/pix/enviados/${string}`;
                        readonly method: "get";
                    };
                    readonly pixSendList: () => {
                        readonly route: "/v2/gn/pix/enviados";
                        readonly method: "get";
                    };
                    readonly pixDevolution: ({ id, e2eId }: {
                        id: string;
                        e2eId: string;
                    }) => {
                        readonly route: `/v2/pix/${string}/devolucao/${string}`;
                        readonly method: "put";
                    };
                    readonly pixDetailDevolution: ({ id, e2eId }: {
                        id: string;
                        e2eId: string;
                    }) => {
                        readonly route: `/v2/pix/${string}/devolucao/${string}`;
                        readonly method: "get";
                    };
                    readonly pixConfigWebhook: ({ chave }: {
                        chave: string;
                    }) => {
                        readonly route: `/v2/webhook/${string}`;
                        readonly method: "put";
                    };
                    readonly pixDetailWebhook: ({ chave }: {
                        chave: string;
                    }) => {
                        readonly route: `/v2/webhook/${string}`;
                        readonly method: "get";
                    };
                    readonly pixListWebhook: () => {
                        readonly route: "/v2/webhook";
                        readonly method: "get";
                    };
                    readonly pixDeleteWebhook: ({ chave }: {
                        chave: string;
                    }) => {
                        readonly route: `/v2/webhook/${string}`;
                        readonly method: "delete";
                    };
                    readonly pixCreateDueChargeBatch: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/lotecobv/${number}`;
                        readonly method: "put";
                    };
                    readonly pixUpdateDueChargeBatch: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/lotecobv/${number}`;
                        readonly method: "patch";
                    };
                    readonly pixDetailDueChargeBatch: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/lotecobv/${number}`;
                        readonly method: "get";
                    };
                    readonly pixListDueChargeBatch: () => {
                        readonly route: "/v2/lotecobv/";
                        readonly method: "get";
                    };
                    readonly pixCreateLocation: () => {
                        readonly route: "/v2/loc";
                        readonly method: "post";
                    };
                    readonly pixLocationList: () => {
                        readonly route: "/v2/loc";
                        readonly method: "get";
                    };
                    readonly pixDetailLocation: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/loc/${number}`;
                        readonly method: "get";
                    };
                    readonly pixGenerateQRCode: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/loc/${number}/qrcode`;
                        readonly method: "get";
                    };
                    readonly pixUnlinkTxidLocation: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/loc/${number}/txid`;
                        readonly method: "delete";
                    };
                    readonly pixCreateEvp: () => {
                        readonly route: "/v2/gn/evp";
                        readonly method: "post";
                    };
                    readonly pixListEvp: () => {
                        readonly route: "/v2/gn/evp";
                        readonly method: "get";
                    };
                    readonly pixDeleteEvp: ({ chave }: {
                        chave: string;
                    }) => {
                        readonly route: `/v2/gn/evp/${string}`;
                        readonly method: "delete";
                    };
                    readonly getAccountBalance: () => {
                        readonly route: "/v2/gn/saldo";
                        readonly method: "get";
                    };
                    readonly updateAccountConfig: () => {
                        readonly route: "/v2/gn/config";
                        readonly method: "put";
                    };
                    readonly listAccountConfig: () => {
                        readonly route: "/v2/gn/config";
                        readonly method: "get";
                    };
                    readonly pixSplitDetailCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/gn/split/cob/${string}`;
                        readonly method: "get";
                    };
                    readonly pixSplitLinkCharge: ({ txid, splitConfigId, }: {
                        txid: string;
                        splitConfigId: string;
                    }) => {
                        readonly route: `/v2/gn/split/cob/${string}/vinculo/${string}`;
                        readonly method: "put";
                    };
                    readonly pixSplitUnlinkCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/gn/split/cob/${string}/vinculo`;
                        readonly method: "delete";
                    };
                    readonly pixSplitDetailDueCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/gn/split/cobv/${string}`;
                        readonly method: "get";
                    };
                    readonly pixSplitLinkDueCharge: ({ txid, splitConfigId, }: {
                        txid: string;
                        splitConfigId: string;
                    }) => {
                        readonly route: `/v2/gn/split/cobv/${string}/vinculo/${string}`;
                        readonly method: "put";
                    };
                    readonly pixSplitUnlinkDueCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/gn/split/cobv/${string}/vinculo`;
                        readonly method: "delete";
                    };
                    readonly pixSplitConfig: () => {
                        readonly route: "/v2/gn/split/config";
                        readonly method: "post";
                    };
                    readonly pixSplitConfigId: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/v2/gn/split/config/${string}`;
                        readonly method: "put";
                    };
                    readonly pixSplitDetailConfig: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/v2/gn/split/config/${string}`;
                        readonly method: "get";
                    };
                    readonly pixSendDetailId: ({ idEnvio }: {
                        idEnvio: string;
                    }) => {
                        readonly route: `/v2/gn/pix/enviados/id-envio/${string}`;
                        readonly method: "get";
                    };
                };
            };
            readonly DEFAULT: {
                readonly URL: {
                    readonly PRODUCTION: "https://api.gerencianet.com.br/v1";
                    readonly SANDBOX: "https://sandbox.gerencianet.com.br/v1";
                };
                readonly ENDPOINTS: {
                    readonly authorize: () => {
                        readonly route: "/authorize";
                        readonly method: "post";
                    };
                    readonly sendSubscriptionLinkEmail: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/subscription/resend`;
                        readonly method: "post";
                    };
                    readonly oneStepSubscription: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/plan/${string}/subscription/one-step`;
                        readonly method: "post";
                    };
                    readonly settleCarnet: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}/settle`;
                        readonly method: "put";
                    };
                    readonly oneStepSubscriptionLink: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/plan/${string}/subscription/one-step/link`;
                        readonly method: "post";
                    };
                    readonly sendLinkEmail: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/link/resend`;
                        readonly method: "post";
                    };
                    readonly createOneStepLink: () => {
                        readonly route: "/charge/one-step/link";
                        readonly method: "post";
                    };
                    readonly createCharge: () => {
                        readonly route: "/charge";
                        readonly method: "post";
                    };
                    readonly detailCharge: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}`;
                        readonly method: "get";
                    };
                    readonly updateChargeMetadata: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/metadata`;
                        readonly method: "put";
                    };
                    readonly updateBillet: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/billet`;
                        readonly method: "put";
                    };
                    readonly definePayMethod: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/pay`;
                        readonly method: "post";
                    };
                    readonly cancelCharge: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/cancel`;
                        readonly method: "put";
                    };
                    readonly createCarnet: () => {
                        readonly route: "/carnet";
                        readonly method: "post";
                    };
                    readonly detailCarnet: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}`;
                        readonly method: "get";
                    };
                    readonly updateCarnetParcel: ({ id, parcel }: {
                        id: string;
                        parcel: string;
                    }) => {
                        readonly route: `/carnet/${string}/parcel/${string}`;
                        readonly method: "put";
                    };
                    readonly updateCarnetMetadata: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}/metadata`;
                        readonly method: "put";
                    };
                    readonly getNotification: ({ token }: {
                        token: string;
                    }) => {
                        readonly route: `/notification/${string}`;
                        readonly method: "get";
                    };
                    readonly listPlans: () => {
                        readonly route: "/plans";
                        readonly method: "get";
                    };
                    readonly createPlan: () => {
                        readonly route: "/plan";
                        readonly method: "post";
                    };
                    readonly deletePlan: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/plan/${string}`;
                        readonly method: "delete";
                    };
                    readonly createSubscription: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/plan/${string}/subscription`;
                        readonly method: "post";
                    };
                    readonly detailSubscription: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/subscription/${string}`;
                        readonly method: "get";
                    };
                    readonly defineSubscriptionPayMethod: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/subscription/${string}/pay`;
                        readonly method: "post";
                    };
                    readonly cancelSubscription: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/subscription/${string}/cancel`;
                        readonly method: "put";
                    };
                    readonly updateSubscriptionMetadata: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/subscription/${string}/metadata`;
                        readonly method: "put";
                    };
                    readonly getInstallments: () => {
                        readonly route: "/installments";
                        readonly method: "get";
                    };
                    readonly sendBilletEmail: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/billet/resend`;
                        readonly method: "post";
                    };
                    readonly createChargeHistory: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/history`;
                        readonly method: "post";
                    };
                    readonly sendCarnetEmail: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}/resend`;
                        readonly method: "post";
                    };
                    readonly sendCarnetParcelEmail: ({ id, parcel }: {
                        id: string;
                        parcel: string;
                    }) => {
                        readonly route: `/carnet/${string}/parcel/${string}/resend`;
                        readonly method: "post";
                    };
                    readonly createCarnetHistory: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}/history`;
                        readonly method: "post";
                    };
                    readonly cancelCarnet: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}/cancel`;
                        readonly method: "put";
                    };
                    readonly cancelCarnetParcel: ({ id, parcel }: {
                        id: string;
                        parcel: string;
                    }) => {
                        readonly route: `/carnet/${string}/parcel/${string}/cancel`;
                        readonly method: "put";
                    };
                    readonly linkCharge: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/link`;
                        readonly method: "post";
                    };
                    readonly defineLinkPayMethod: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/link`;
                        readonly method: "post";
                    };
                    readonly updateChargeLink: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/link`;
                        readonly method: "put";
                    };
                    readonly updatePlan: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/plan/${string}`;
                        readonly method: "put";
                    };
                    readonly createSubscriptionHistory: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/subscription/${string}/history`;
                        readonly method: "post";
                    };
                    readonly defineBalanceSheetBillet: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/balance-sheet`;
                        readonly method: "post";
                    };
                    readonly settleCharge: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/settle`;
                        readonly method: "put";
                    };
                    readonly settleCarnetParcel: ({ id, parcel }: {
                        id: string;
                        parcel: string;
                    }) => {
                        readonly route: `/carnet/${string}/parcel/${string}/settle`;
                        readonly method: "put";
                    };
                    readonly createOneStepCharge: () => {
                        readonly route: "/charge/one-step";
                        readonly method: "post";
                    };
                };
            };
            readonly OPENFINANCE: {
                readonly URL: {
                    readonly PRODUCTION: "https://apis.gerencianet.com.br/open-finance";
                    readonly SANDBOX: "https://apis-h.gerencianet.com.br/open-finance";
                };
                readonly ENDPOINTS: {
                    readonly authorize: () => {
                        readonly route: "/oauth/token";
                        readonly method: "post";
                    };
                    readonly ofListParticipants: () => {
                        readonly route: "/participantes/";
                        readonly method: "GET";
                    };
                    readonly ofStartPixPayment: () => {
                        readonly route: "/pagamentos/pix";
                        readonly method: "POST";
                    };
                    readonly ofListPixPayment: () => {
                        readonly route: "/pagamentos/pix";
                        readonly method: "GET";
                    };
                    readonly ofConfigUpdate: () => {
                        readonly route: "/config";
                        readonly method: "PUT";
                    };
                    readonly ofConfigDetail: () => {
                        readonly route: "/config";
                        readonly method: "GET";
                    };
                    readonly ofDevolutionPix: ({ identificadorPagamento, }: {
                        identificadorPagamento: string;
                    }) => {
                        readonly route: `/pagamentos/pix/${string}/devolver`;
                        readonly method: "post";
                    };
                };
            };
            readonly PAGAMENTOS: {
                readonly URL: {
                    readonly PRODUCTION: "https://apis.gerencianet.com.br/pagamento";
                    readonly SANDBOX: "https://apis-h.gerencianet.com.br/pagamento";
                };
                readonly ENDPOINTS: {
                    readonly authorize: () => {
                        readonly route: "/oauth/token";
                        readonly method: "post";
                    };
                    readonly payDetailBarCode: ({ codBarras }: {
                        codBarras: string;
                    }) => {
                        readonly route: `/codBarras/${string}`;
                        readonly method: "GET";
                    };
                    readonly payRequestBarCode: ({ codBarras }: {
                        codBarras: string;
                    }) => {
                        readonly route: `/codBarras/${string}`;
                        readonly method: "POST";
                    };
                    readonly payDetailPayment: ({ idPagamento }: {
                        idPagamento: string;
                    }) => {
                        readonly route: `/${string}`;
                        readonly method: "GET";
                    };
                    readonly payListPayments: () => {
                        readonly route: "/resumo";
                        readonly method: "GET";
                    };
                };
            };
            readonly CONTAS: {
                readonly URL: {
                    readonly PRODUCTION: "https://apis.gerencianet.com.br";
                    readonly SANDBOX: "https://apis-h.gerencianet.com.br";
                };
                readonly ENDPOINTS: {
                    readonly authorize: () => {
                        readonly route: "/oauth/token";
                        readonly method: "post";
                    };
                    readonly createAccount: () => {
                        readonly route: "/cadastro/conta-simplificada";
                        readonly method: "post";
                    };
                    readonly createAccountCertificate: ({ identificador }: {
                        identificador: string;
                    }) => {
                        readonly route: `/cadastro/conta-simplificada/${string}/certificado`;
                        readonly method: "post";
                    };
                    readonly getAccountCredentials: ({ identificador }: {
                        identificador: string;
                    }) => {
                        readonly route: `/cadastro/conta-simplificada/${string}/credenciais`;
                        readonly method: "get";
                    };
                    readonly accountConfigWebhook: () => {
                        readonly route: "/cadastro/webhook";
                        readonly method: "post";
                    };
                    readonly accountDeleteWebhook: ({ identificador }: {
                        identificador: string;
                    }) => {
                        readonly route: `/cadastro/webhook/${string}Webhook`;
                        readonly method: "delete";
                    };
                    readonly accountDetailWebhook: ({ identificador }: {
                        identificador: string;
                    }) => {
                        readonly route: `/cadastro/webhook/${string}Webhook`;
                        readonly method: "get";
                    };
                    readonly accountListWebhook: () => {
                        readonly route: "/cadastro/webhooks";
                        readonly method: "get";
                    };
                };
            };
        }[operation];
        options: EfiConfig<type, operation>;
        auth: Auth<type, operation>;
        baseUrl: {
            readonly PIX: {
                readonly URL: {
                    readonly PRODUCTION: "https://pix.api.efipay.com.br";
                    readonly SANDBOX: "https://pix-h.api.efipay.com.br";
                };
                readonly ENDPOINTS: {
                    readonly authorize: () => {
                        readonly route: "/oauth/token";
                        readonly method: "post";
                    };
                    readonly pixCreateDueCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cobv/${string}`;
                        readonly method: "put";
                    };
                    readonly pixUpdateDueCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cobv/${string}`;
                        readonly method: "patch";
                    };
                    readonly pixDetailDueCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cobv/${string}`;
                        readonly method: "get";
                    };
                    readonly pixListDueCharges: () => {
                        readonly route: "/v2/cobv/";
                        readonly method: "get";
                    };
                    readonly createReport: () => {
                        readonly route: "/v2/gn/relatorios/extrato-conciliacao";
                        readonly method: "post";
                    };
                    readonly detailReport: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/v2/gn/relatorios/${string}`;
                        readonly method: "get";
                    };
                    readonly pixCreateCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cob/${string}`;
                        readonly method: "put";
                    };
                    readonly pixUpdateCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cob/${string}`;
                        readonly method: "patch";
                    };
                    readonly pixCreateImmediateCharge: () => {
                        readonly route: "/v2/cob";
                        readonly method: "post";
                    };
                    readonly pixDetailCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/cob/${string}`;
                        readonly method: "get";
                    };
                    readonly pixListCharges: () => {
                        readonly route: "/v2/cob";
                        readonly method: "get";
                    };
                    readonly pixDetailReceived: ({ e2eId }: {
                        e2eId: string;
                    }) => {
                        readonly route: `/v2/pix/${string}`;
                        readonly method: "get";
                    };
                    readonly pixReceivedList: () => {
                        readonly route: "/v2/pix";
                        readonly method: "get";
                    };
                    readonly pixSend: ({ idEnvio }: {
                        idEnvio: string;
                    }) => {
                        readonly route: `/v2/gn/pix/${string}`;
                        readonly method: "put";
                    };
                    readonly pixSendDetail: ({ e2eId }: {
                        e2eId: string;
                    }) => {
                        readonly route: `/v2/gn/pix/enviados/${string}`;
                        readonly method: "get";
                    };
                    readonly pixSendList: () => {
                        readonly route: "/v2/gn/pix/enviados";
                        readonly method: "get";
                    };
                    readonly pixDevolution: ({ id, e2eId }: {
                        id: string;
                        e2eId: string;
                    }) => {
                        readonly route: `/v2/pix/${string}/devolucao/${string}`;
                        readonly method: "put";
                    };
                    readonly pixDetailDevolution: ({ id, e2eId }: {
                        id: string;
                        e2eId: string;
                    }) => {
                        readonly route: `/v2/pix/${string}/devolucao/${string}`;
                        readonly method: "get";
                    };
                    readonly pixConfigWebhook: ({ chave }: {
                        chave: string;
                    }) => {
                        readonly route: `/v2/webhook/${string}`;
                        readonly method: "put";
                    };
                    readonly pixDetailWebhook: ({ chave }: {
                        chave: string;
                    }) => {
                        readonly route: `/v2/webhook/${string}`;
                        readonly method: "get";
                    };
                    readonly pixListWebhook: () => {
                        readonly route: "/v2/webhook";
                        readonly method: "get";
                    };
                    readonly pixDeleteWebhook: ({ chave }: {
                        chave: string;
                    }) => {
                        readonly route: `/v2/webhook/${string}`;
                        readonly method: "delete";
                    };
                    readonly pixCreateDueChargeBatch: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/lotecobv/${number}`;
                        readonly method: "put";
                    };
                    readonly pixUpdateDueChargeBatch: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/lotecobv/${number}`;
                        readonly method: "patch";
                    };
                    readonly pixDetailDueChargeBatch: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/lotecobv/${number}`;
                        readonly method: "get";
                    };
                    readonly pixListDueChargeBatch: () => {
                        readonly route: "/v2/lotecobv/";
                        readonly method: "get";
                    };
                    readonly pixCreateLocation: () => {
                        readonly route: "/v2/loc";
                        readonly method: "post";
                    };
                    readonly pixLocationList: () => {
                        readonly route: "/v2/loc";
                        readonly method: "get";
                    };
                    readonly pixDetailLocation: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/loc/${number}`;
                        readonly method: "get";
                    };
                    readonly pixGenerateQRCode: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/loc/${number}/qrcode`;
                        readonly method: "get";
                    };
                    readonly pixUnlinkTxidLocation: ({ id }: {
                        id: number;
                    }) => {
                        readonly route: `/v2/loc/${number}/txid`;
                        readonly method: "delete";
                    };
                    readonly pixCreateEvp: () => {
                        readonly route: "/v2/gn/evp";
                        readonly method: "post";
                    };
                    readonly pixListEvp: () => {
                        readonly route: "/v2/gn/evp";
                        readonly method: "get";
                    };
                    readonly pixDeleteEvp: ({ chave }: {
                        chave: string;
                    }) => {
                        readonly route: `/v2/gn/evp/${string}`;
                        readonly method: "delete";
                    };
                    readonly getAccountBalance: () => {
                        readonly route: "/v2/gn/saldo";
                        readonly method: "get";
                    };
                    readonly updateAccountConfig: () => {
                        readonly route: "/v2/gn/config";
                        readonly method: "put";
                    };
                    readonly listAccountConfig: () => {
                        readonly route: "/v2/gn/config";
                        readonly method: "get";
                    };
                    readonly pixSplitDetailCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/gn/split/cob/${string}`;
                        readonly method: "get";
                    };
                    readonly pixSplitLinkCharge: ({ txid, splitConfigId, }: {
                        txid: string;
                        splitConfigId: string;
                    }) => {
                        readonly route: `/v2/gn/split/cob/${string}/vinculo/${string}`;
                        readonly method: "put";
                    };
                    readonly pixSplitUnlinkCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/gn/split/cob/${string}/vinculo`;
                        readonly method: "delete";
                    };
                    readonly pixSplitDetailDueCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/gn/split/cobv/${string}`;
                        readonly method: "get";
                    };
                    readonly pixSplitLinkDueCharge: ({ txid, splitConfigId, }: {
                        txid: string;
                        splitConfigId: string;
                    }) => {
                        readonly route: `/v2/gn/split/cobv/${string}/vinculo/${string}`;
                        readonly method: "put";
                    };
                    readonly pixSplitUnlinkDueCharge: ({ txid }: {
                        txid: string;
                    }) => {
                        readonly route: `/v2/gn/split/cobv/${string}/vinculo`;
                        readonly method: "delete";
                    };
                    readonly pixSplitConfig: () => {
                        readonly route: "/v2/gn/split/config";
                        readonly method: "post";
                    };
                    readonly pixSplitConfigId: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/v2/gn/split/config/${string}`;
                        readonly method: "put";
                    };
                    readonly pixSplitDetailConfig: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/v2/gn/split/config/${string}`;
                        readonly method: "get";
                    };
                    readonly pixSendDetailId: ({ idEnvio }: {
                        idEnvio: string;
                    }) => {
                        readonly route: `/v2/gn/pix/enviados/id-envio/${string}`;
                        readonly method: "get";
                    };
                };
            };
            readonly DEFAULT: {
                readonly URL: {
                    readonly PRODUCTION: "https://api.gerencianet.com.br/v1";
                    readonly SANDBOX: "https://sandbox.gerencianet.com.br/v1";
                };
                readonly ENDPOINTS: {
                    readonly authorize: () => {
                        readonly route: "/authorize";
                        readonly method: "post";
                    };
                    readonly sendSubscriptionLinkEmail: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/subscription/resend`;
                        readonly method: "post";
                    };
                    readonly oneStepSubscription: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/plan/${string}/subscription/one-step`;
                        readonly method: "post";
                    };
                    readonly settleCarnet: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}/settle`;
                        readonly method: "put";
                    };
                    readonly oneStepSubscriptionLink: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/plan/${string}/subscription/one-step/link`;
                        readonly method: "post";
                    };
                    readonly sendLinkEmail: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/link/resend`;
                        readonly method: "post";
                    };
                    readonly createOneStepLink: () => {
                        readonly route: "/charge/one-step/link";
                        readonly method: "post";
                    };
                    readonly createCharge: () => {
                        readonly route: "/charge";
                        readonly method: "post";
                    };
                    readonly detailCharge: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}`;
                        readonly method: "get";
                    };
                    readonly updateChargeMetadata: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/metadata`;
                        readonly method: "put";
                    };
                    readonly updateBillet: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/billet`;
                        readonly method: "put";
                    };
                    readonly definePayMethod: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/pay`;
                        readonly method: "post";
                    };
                    readonly cancelCharge: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/cancel`;
                        readonly method: "put";
                    };
                    readonly createCarnet: () => {
                        readonly route: "/carnet";
                        readonly method: "post";
                    };
                    readonly detailCarnet: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}`;
                        readonly method: "get";
                    };
                    readonly updateCarnetParcel: ({ id, parcel }: {
                        id: string;
                        parcel: string;
                    }) => {
                        readonly route: `/carnet/${string}/parcel/${string}`;
                        readonly method: "put";
                    };
                    readonly updateCarnetMetadata: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}/metadata`;
                        readonly method: "put";
                    };
                    readonly getNotification: ({ token }: {
                        token: string;
                    }) => {
                        readonly route: `/notification/${string}`;
                        readonly method: "get";
                    };
                    readonly listPlans: () => {
                        readonly route: "/plans";
                        readonly method: "get";
                    };
                    readonly createPlan: () => {
                        readonly route: "/plan";
                        readonly method: "post";
                    };
                    readonly deletePlan: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/plan/${string}`;
                        readonly method: "delete";
                    };
                    readonly createSubscription: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/plan/${string}/subscription`;
                        readonly method: "post";
                    };
                    readonly detailSubscription: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/subscription/${string}`;
                        readonly method: "get";
                    };
                    readonly defineSubscriptionPayMethod: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/subscription/${string}/pay`;
                        readonly method: "post";
                    };
                    readonly cancelSubscription: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/subscription/${string}/cancel`;
                        readonly method: "put";
                    };
                    readonly updateSubscriptionMetadata: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/subscription/${string}/metadata`;
                        readonly method: "put";
                    };
                    readonly getInstallments: () => {
                        readonly route: "/installments";
                        readonly method: "get";
                    };
                    readonly sendBilletEmail: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/billet/resend`;
                        readonly method: "post";
                    };
                    readonly createChargeHistory: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/history`;
                        readonly method: "post";
                    };
                    readonly sendCarnetEmail: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}/resend`;
                        readonly method: "post";
                    };
                    readonly sendCarnetParcelEmail: ({ id, parcel }: {
                        id: string;
                        parcel: string;
                    }) => {
                        readonly route: `/carnet/${string}/parcel/${string}/resend`;
                        readonly method: "post";
                    };
                    readonly createCarnetHistory: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}/history`;
                        readonly method: "post";
                    };
                    readonly cancelCarnet: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/carnet/${string}/cancel`;
                        readonly method: "put";
                    };
                    readonly cancelCarnetParcel: ({ id, parcel }: {
                        id: string;
                        parcel: string;
                    }) => {
                        readonly route: `/carnet/${string}/parcel/${string}/cancel`;
                        readonly method: "put";
                    };
                    readonly linkCharge: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/link`;
                        readonly method: "post";
                    };
                    readonly defineLinkPayMethod: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/link`;
                        readonly method: "post";
                    };
                    readonly updateChargeLink: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/link`;
                        readonly method: "put";
                    };
                    readonly updatePlan: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/plan/${string}`;
                        readonly method: "put";
                    };
                    readonly createSubscriptionHistory: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/subscription/${string}/history`;
                        readonly method: "post";
                    };
                    readonly defineBalanceSheetBillet: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/balance-sheet`;
                        readonly method: "post";
                    };
                    readonly settleCharge: ({ id }: {
                        id: string;
                    }) => {
                        readonly route: `/charge/${string}/settle`;
                        readonly method: "put";
                    };
                    readonly settleCarnetParcel: ({ id, parcel }: {
                        id: string;
                        parcel: string;
                    }) => {
                        readonly route: `/carnet/${string}/parcel/${string}/settle`;
                        readonly method: "put";
                    };
                    readonly createOneStepCharge: () => {
                        readonly route: "/charge/one-step";
                        readonly method: "post";
                    };
                };
            };
            readonly OPENFINANCE: {
                readonly URL: {
                    readonly PRODUCTION: "https://apis.gerencianet.com.br/open-finance";
                    readonly SANDBOX: "https://apis-h.gerencianet.com.br/open-finance";
                };
                readonly ENDPOINTS: {
                    readonly authorize: () => {
                        readonly route: "/oauth/token";
                        readonly method: "post";
                    };
                    readonly ofListParticipants: () => {
                        readonly route: "/participantes/";
                        readonly method: "GET";
                    };
                    readonly ofStartPixPayment: () => {
                        readonly route: "/pagamentos/pix";
                        readonly method: "POST";
                    };
                    readonly ofListPixPayment: () => {
                        readonly route: "/pagamentos/pix";
                        readonly method: "GET";
                    };
                    readonly ofConfigUpdate: () => {
                        readonly route: "/config";
                        readonly method: "PUT";
                    };
                    readonly ofConfigDetail: () => {
                        readonly route: "/config";
                        readonly method: "GET";
                    };
                    readonly ofDevolutionPix: ({ identificadorPagamento, }: {
                        identificadorPagamento: string;
                    }) => {
                        readonly route: `/pagamentos/pix/${string}/devolver`;
                        readonly method: "post";
                    };
                };
            };
            readonly PAGAMENTOS: {
                readonly URL: {
                    readonly PRODUCTION: "https://apis.gerencianet.com.br/pagamento";
                    readonly SANDBOX: "https://apis-h.gerencianet.com.br/pagamento";
                };
                readonly ENDPOINTS: {
                    readonly authorize: () => {
                        readonly route: "/oauth/token";
                        readonly method: "post";
                    };
                    readonly payDetailBarCode: ({ codBarras }: {
                        codBarras: string;
                    }) => {
                        readonly route: `/codBarras/${string}`;
                        readonly method: "GET";
                    };
                    readonly payRequestBarCode: ({ codBarras }: {
                        codBarras: string;
                    }) => {
                        readonly route: `/codBarras/${string}`;
                        readonly method: "POST";
                    };
                    readonly payDetailPayment: ({ idPagamento }: {
                        idPagamento: string;
                    }) => {
                        readonly route: `/${string}`;
                        readonly method: "GET";
                    };
                    readonly payListPayments: () => {
                        readonly route: "/resumo";
                        readonly method: "GET";
                    };
                };
            };
            readonly CONTAS: {
                readonly URL: {
                    readonly PRODUCTION: "https://apis.gerencianet.com.br";
                    readonly SANDBOX: "https://apis-h.gerencianet.com.br";
                };
                readonly ENDPOINTS: {
                    readonly authorize: () => {
                        readonly route: "/oauth/token";
                        readonly method: "post";
                    };
                    readonly createAccount: () => {
                        readonly route: "/cadastro/conta-simplificada";
                        readonly method: "post";
                    };
                    readonly createAccountCertificate: ({ identificador }: {
                        identificador: string;
                    }) => {
                        readonly route: `/cadastro/conta-simplificada/${string}/certificado`;
                        readonly method: "post";
                    };
                    readonly getAccountCredentials: ({ identificador }: {
                        identificador: string;
                    }) => {
                        readonly route: `/cadastro/conta-simplificada/${string}/credenciais`;
                        readonly method: "get";
                    };
                    readonly accountConfigWebhook: () => {
                        readonly route: "/cadastro/webhook";
                        readonly method: "post";
                    };
                    readonly accountDeleteWebhook: ({ identificador }: {
                        identificador: string;
                    }) => {
                        readonly route: `/cadastro/webhook/${string}Webhook`;
                        readonly method: "delete";
                    };
                    readonly accountDetailWebhook: ({ identificador }: {
                        identificador: string;
                    }) => {
                        readonly route: `/cadastro/webhook/${string}Webhook`;
                        readonly method: "get";
                    };
                    readonly accountListWebhook: () => {
                        readonly route: "/cadastro/webhooks";
                        readonly method: "get";
                    };
                };
            };
        }[operation]["URL"][type];
    };
    protected makeHeaders({ accessToken }: {
        accessToken: string;
    }): {
        readonly 'api-sdk': "efi-typescript-1.0.2";
        readonly 'Content-Type': "application/json";
        readonly authorization: `Bearer ${string}`;
        readonly 'x-skip-mtls-checking': boolean;
    } & {
        'partner-token'?: string;
    };
    protected makeRequest<Method, Url extends string, SearchParams extends SearchParamsType, Body>({ accessToken, method, searchParams, routeUrl, body, }: {
        accessToken: string;
        method: Method;
        searchParams?: SearchParams;
        routeUrl: Url;
        body?: Body;
    }): {
        readonly method: Method;
        readonly url: string;
        readonly headers: {
            readonly 'api-sdk': "efi-typescript-1.0.2";
            readonly 'Content-Type': "application/json";
            readonly authorization: `Bearer ${string}`;
            readonly 'x-skip-mtls-checking': boolean;
        } & {
            'partner-token'?: string;
        };
        readonly data: Body | undefined;
    } & {
        httpsAgent?: https.Agent;
    };
    protected sendRequest<Route extends string, Method extends string, SearchParams extends Record<string, string | number | Date | boolean>, Body, ResponseClassType extends new (args: ConstructorSingleParameters<ResponseClassType>) => InstanceType<ResponseClassType>>({ route, body, method, searchParams, ResponseClass, }: {
        route: Route;
        body?: Body;
        method: Method;
        searchParams?: SearchParams;
        ResponseClass: ResponseClassType;
    }): Promise<InstanceType<ResponseClassType> | null>;
    abstract useCredentials<T>(props: {
        clientId: string;
        clientSecret: string;
        Instance: T;
    }): T;
}

declare abstract class ApiResponse {
    abstract toObject(...props: unknown[]): unknown;
    toJson(replacer?: Parameters<typeof JSON.stringify>[1], space?: Parameters<typeof JSON.stringify>[2]): string;
}

type ArrayParameters = {
    inicio: string;
    fim: string;
    paginacao: {
        paginaAtual: number;
        itensPorPagina: number;
        quantidadeDePaginas: number;
        quantidadeTotalDeItens: number;
    };
};
interface ApiArrayResponseProps<ArrayData> {
    parametros: ArrayParameters;
    arrayData: ArrayData[];
}
declare abstract class ApiArrayResponse<ArrayData extends new (props: ConstructorSingleParameters<ArrayData>) => InstanceType<ArrayData>> extends ApiResponse {
    protected props: {
        parametros: {
            inicio: Date;
            fim: Date;
            paginacao: {
                paginaAtual: number;
                itensPorPagina: number;
                quantidadeDePaginas: number;
                quantidadeTotalDeItens: number;
            };
        };
        arrayData: InstanceType<ArrayData>[];
    };
    constructor(props: ApiArrayResponseProps<ConstructorSingleParameters<ArrayData>>, CobClass: ArrayData);
    /**
     * Filtro dos registros cuja data de criação seja maior ou igual que a data de início. Respeita RFC 3339.
     */
    get inicio(): dayjs.Dayjs;
    /**
     * Filtro dos registros cuja data de criação seja menor ou igual que a data de fim. Respeita RFC 3339.
     */
    get fim(): dayjs.Dayjs;
    /**
     * Paginação - indica a página atual.
     */
    get paginaAtual(): number;
    /**
     * Paginação - indica a quantidade de itens por página.
     */
    get itensPorPagina(): number;
    /**
     * Paginação - indica a quantidade total de páginas.
     */
    get quantidadeDePaginas(): number;
    /**
     * Paginação - indica a quantidade total de itens.
     */
    get quantidadeTotalDeItens(): number;
    /**
     * Cobranças - retorna uma lista de cobranças, correspondendo à paginação atual.
     */
    protected get arrayData(): InstanceType<ArrayData>[];
    abstract toObject(...props: unknown[]): unknown;
    toJson(replacer?: Parameters<typeof JSON.stringify>[1], space?: Parameters<typeof JSON.stringify>[2]): string;
}

type TipoCob<type extends 'cob' | 'cobv' | undefined = undefined> = type extends undefined ? 'cob' | 'cobv' : type extends 'cob' ? 'cob' : type extends 'cobv' ? 'cobv' : never;
interface PixLocationProps<type extends 'cob' | 'cobv' | undefined = undefined> extends Loc<type> {
}
/**
 * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
 */
declare class PixLocation<type extends 'cob' | 'cobv' | undefined = undefined> extends ApiResponse {
    #private;
    constructor({ id, location, tipoCob, criacao, txid, }: PixLocationProps<type>);
    get id(): number;
    /**
     * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
     */
    get location(): string;
    get tipoCob(): TipoCob<type>;
    get criacao(): dayjs.Dayjs | undefined;
    toObject(): {
        id: number;
        /**
         * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
         */
        location: string;
        tipoCob: TipoCob<type>;
        criacao: Date | undefined;
    };
}

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
type TxId$2 = string

/**
 * EndToEndIdentification que transita na PACS002, PACS004 e PACS008. `32 characters` `^[a-zA-Z0-9]{32}`
 */
type E2eId$1 = string

/**
 * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
 *
 * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
 *
 * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
 *
 * - string (Chave DICT do recebedor) `≤ 77 characters`
 */
type Chave = string

/**
 * O campo solicitacaoPagador, opcional, determina um texto a ser apresentado ao pagador para que ele possa digitar uma informação correlata, em formato livre, a ser enviada ao recebedor. Esse texto será preenchido, na pacs.008, pelo PSP do pagador, no campo RemittanceInformation . O tamanho do campo na pacs.008 está limitado a 140 caracteres.
 *
 * - string (Solicitação ao pagador) `≤ 140 characters`
 */
type SolicitacaoPagador = string

/**
 * Permite recuperar revisões anteriores de uma cobrança. Na ausência desse parâmetro, sempre será retornada a cobrança conforme consta em sua última revisão.
 *
 * - integer($int32)
 */
type Revisao = number

/**
 * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
 */
type Location$1 = string

type Loc<type extends 'cob' | 'cobv' | undefined = undefined> = {
  /**
   *  ID do location a ser associada a cobrança. int32
   */
  id: number
  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  location: Location$1
  tipoCob: TipoCob<type>
  criacao?: string
  txid?: string
}

/**
 * Cada respectiva informação adicional contida na lista (nome e valor) deve ser apresentada ao pagador.
 */
type InfoAdicionais = {
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
type PixStatus = 'EM_PROCESSAMENTO' | 'REALIZADO' | 'NAO_REALIZADO'

type Status$2 =
  | 'ATIVA'
  | 'CONCLUIDA'
  | 'REMOVIDA_PELO_USUARIO_RECEBEDOR'
  | 'REMOVIDA_PELO_PSP'

/**
 * Filtra os registros cuja data de criação seja maior ou igual que a data de início. Respeita RFC 3339.
 *
 * - `string`
 */
type InicioFilterSearch = Date
/**
 * Filtra os registros cuja data de criação seja menor ou igual que a data de fim. Respeita RFC 3339.
 *
 * - `string`
 */
type FimFilterSearch = Date
/**
 * Filtro pelo CPF do pagador. Não pode ser utilizado ao mesmo tempo que o CNPJ.
 *
 * - string `/^\d{11}$/`
 */
type CpfFilterSearch = string
/**
 * Filtro pelo CNPJ do pagador. Não pode ser utilizado ao mesmo tempo que o CPF.
 *
 * - string `/^\d{14}$/`
 */
type CnpjFilterSearch = string
/**
 * Filtro pelo status da cobrança.
 *
 * - Enum: `"ATIVA"`,`"CONCLUIDA"`, `"REMOVIDA_PELO_USUARIO_RECEBEDOR"`, `"REMOVIDA_PELO_PSP"`
 */
type StatusFilterSearch = Status$2
/**
 * Página a ser retornada pela consulta. Se não for informada, o PSP assumirá que será 0.
 *
 * - integer {int32} (Página atual) `>= 0`
 * - Default: `0`
 */
type PaginaAtualFilterSearch = number
/**
 * Quantidade máxima de registros retornados em cada página. Apenas a última página pode conter uma quantidade menor de registros.
 *
 * - integer {int32} (Página atual) `[1 .. 1000]`
 * - Default: `100`
 */
type ItensPorPaginaFilterSearch = number

// type Parameters = {
//   inicio: string
//   fim: string
//   paginacao: {
//     paginaAtual: number
//     itensPorPagina: number
//     quantidadeDePaginas: number
//     quantidadeTotalDeItens: number
//   }
// }

type ArrayKey = 'cobs' | 'webhooks' | 'pix' | 'loc' | 'lotes'

type PixChargeResponseTypeArray<
  ArrayData,
  ArrKey extends ArrayKey = 'cobs',
> = ArrKey extends 'cobs'
  ? {
      parametros: ArrayParameters
      cobs: ArrayData[]
    }
  : ArrKey extends 'webhooks'
    ? {
        parametros: ArrayParameters
        webhooks: ArrayData[]
      }
    : ArrKey extends 'pix'
      ? {
          parametros: ArrayParameters
          pix: ArrayData[]
        }
      : ArrKey extends 'loc'
        ? {
            parametros: ArrayParameters
            loc: ArrayData[]
          }
        : ArrKey extends 'lotes'
          ? {
              parametros: ArrayParameters
              lotes: ArrayData[]
            }
          : never

interface PixFilterSearchRawParamsProps extends SearchParamsType {
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
interface PixFilterSearchParamsProps
  extends PixFilterSearchRawParamsProps,
    SearchParamsType {
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
}

interface PixFilterSearchProps {
  searchParams: PixFilterSearchParamsProps
}
interface PixFilterSearchRawProps {
  searchParams: PixFilterSearchRawParamsProps
}

declare const statesShortSchema: z.ZodEnum<["AM", "PA", "RR", "AP", "AC", "RO", "TO", "MA", "PI", "CE", "RN", "PB", "PE", "AL", "SE", "BA", "MG", "ES", "RJ", "SP", "PR", "SC", "RS", "MS", "MT", "GO", "DF"]>;
type StatesShort = z.infer<typeof statesShortSchema>;
declare const statesStatesVerboseSchema: z.ZodEnum<["Amazonas", "Pará", "Roraima", "Amapá", "Acre", "Rondônia", "Tocantins", "Maranhão", "Piauí", "Ceará", "Rio Grande do Norte", "Paraíba", "Pernambuco", "Alagoas", "Sergipe", "Bahia", "Minas Gerais", "Espírito Santo", "Rio de Janeiro", "São Paulo", "Paraná", "Santa Catarina", "Rio Grande do Sul", "Mato Grosso do Sul", "Mato Grosso", "Goiás", "Distrito Federal"]>;
type StatesVerbose = z.infer<typeof statesStatesVerboseSchema>;
declare class State {
    private state;
    constructor(state: StatesShort);
    private shortToVerboseMapper;
    get short(): StatesShort;
    get verbose(): StatesVerbose;
    compareData(state: State): boolean;
}

/**
 * Os campos aninhados sob o objeto devedor são opcionais e identificam o devedor, ou seja, a pessoa ou a instituição a quem a cobrança está endereçada. Não identifica, necessariamente, quem irá efetivamente realizar o pagamento. Um CPF pode ser o devedor de uma cobrança, mas pode acontecer de outro CPF realizar, efetivamente, o pagamento do documento. Não é permitido que o campo pagador.cpf e campo pagador.cnpj estejam preenchidos ao mesmo tempo. Se o campo pagador.cnpj está preenchido, então o campo pagador.cpf não pode estar preenchido, e vice-versa. Se o campo pagador.nome está preenchido, então deve existir ou um pagador.cpf ou um campo pagador.cnpj preenchido.
 *
 * - Pessoa Física (object) or Pessoa Jurídica (object)
 */
type Devedor$1 = {
    /**
     * CPF do usuário pagador.string `/^\d{11}$/`
     */
    cpf?: string;
    /**
     * CNPJ do usuário pagador.string `/^\d{14}$/`
     */
    cnpj?: string;
    /**
     * Nome do usuário pagador. string (Nome) `≤ 200 characters`
     */
    nome: string;
    /**
     * Email do usuário pagador. string (Email)
     */
    email?: string;
    /**
     * Logradouro do usuário pagador. string (Logradouro) `≤ 200 characters`
     */
    logradouro: string;
    /**
     * Cidade do usuário pagador. string (Cidade) `≤ 200 characters`
     */
    cidade: string;
    /**
     * UF do usuário pagador. string (UF) `≤ 2 characters`
     */
    uf: StatesShort;
    /**
     * CEP do usuário pagador. string (CEP) `≤ 8 characters`
     */
    cep: string;
};
/**
 * Os campos aninhados sob o objeto devedor são opcionais e identificam o recebedor, ou seja, a pessoa ou a instituição a quem será beneficiada. Não é permitido que o campo recebedor.cpf e campo recebedor.cnpj estejam preenchidos ao mesmo tempo. Se o campo recebedor.cnpj está preenchido, então o campo recebedor.cpf não pode estar preenchido, e vice-versa. Se o campo recebedor.nome está preenchido, então deve existir ou um recebedor.cpf ou um campo recebedor.cnpj preenchido.
 *
 * - Pessoa Física (object) or Pessoa Jurídica (object)
 */
type Recebedor = Devedor$1;
/**
 * Os campos aninhados sob o identificador **calendário** organizam informações a respeito de controle de tempo da cobrança.
 */
type CalendarioRequest$1 = {
    /**
     * Trata-se de uma data, no formato YYYY-MM-DD, segundo ISO 8601. É a data de vencimento da cobrança. A cobrança pode ser honrada até esse dia, inclusive, em qualquer horário do dia. (String ).
     */
    dataDeVencimento: `${string}-${string}-${string}`;
    /**
     * Trata-se da quantidade de dias corridos após calendario.dataDeVencimento, em que a cobrança poderá ser paga.
     *
     * Sempre que a data de vencimento cair em um fim de semana ou em um feriado para o usuário pagador, ela deve ser automaticamente prorrogada para o primeiro dia útil subsequente. Todos os campos que façam referência a esta data (`validadeAposVencimento`; `desconto`; `juros` e `multa`) devem assumir essa prorrogação, quando for o caso. (Integer <int 16>).
     *
     * Para entender o funcionamento do pagamento após o vencimento, veja os exemplos neste [link](https://dev.efipay.com.br/docs/api-pix/glossario#section-ilustra-o-do-funcionamento-das-cobran-as-cobv-ap-s-a-data-de-vencimento).
     */
    validadeAposVencimento: number;
};
/**
 * Os campos aninhados sob o identificador **calendário** organizam informações a respeito de controle de tempo da cobrança.
 */
type CalendarioResponse$1 = CalendarioRequest$1 & {
    /**
     * Data de criação no formato ISO-String
     */
    criacao: string;
};
/**
 * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
 */
type Valor$2 = {
    /**
     * Valor original da cobrança.string `\d{1,10}\ .\d{2}`
     */
    original: string;
    /**
     * Multa aplicada à cobrança. `object`
     */
    multa: {
        /**
         * Modalidade da multa, conforme tabela de domínios. `integer <1 | 2>`
         *
         * - 1: Valor Fixo
         * - 2: Valor Percentual
         */
        modalidade: 1 | 2;
        /**
         *  Multa do documento em valor absoluto ou percentual, conforme "valor.multa.modalidade". string `\d{1,10}\.\d{2}`
         */
        valorPerc: string;
    };
    /**
     * Juros aplicado à cobrança. `object`
     */
    juros: {
        /**
         * Modalidade da juros, conforme tabela de domínios. `integer <1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>`
         *
         * - 1: Valor (dias corridos)
         * - 2: Percentual ao dia (dias corridos)
         * - 3: Percentual ao mês (dias corridos)
         * - 4: Percentual ao ano (dias corridos)
         * - 5: Valor (dias úteis)
         * - 6: Percentual ao dia  (dias úteis)
         * - 7: Percentual ao mês (dias úteis)
         * - 8: Percentual ao ano (dias úteis)
         */
        modalidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
        /**
         * Juros do documento. string `\d{1,10}\.\d{2}`
         */
        valorPerc: string;
    };
    /**
     * Abatimento aplicado à cobrança. `object`
     */
    abatimento?: {
        /**
         * Modalidade de abatimentos, conforme tabela de domínios. `integer <1 | 2>`
         *
         * - 1: Valor Fixo
         * - 2: Valor Percentual
         */
        modalidade: 1 | 2;
        /**
         * Abatimentos ou outras deduções aplicadas ao documento, em valor absoluto ou percentual do valor original do documento. string `\d{1,10}\.\d{2}`
         */
        valorPerc: string;
    };
    /**
     * Descontos aplicados à cobrança. `object`
     */
    desconto: {
        /**
         * Modalidade de desconto, conforme tabela de domínios. `integer <1 | 2 | 3 | 4 | 5 | 6>`
         *
         * - 1: Valor Fixo até a[s] data[s] informada[s]
         * - 2: Percentual até a data informada
         * - 3: Valor por antecipação dia corrido
         * - 4: Valor por antecipação dia útil
         * - 5: Percentual por antecipação dia corrido
         * - 6: Percentual por antecipação dia útil
         */
        modalidade: 1 | 2 | 3 | 4 | 5 | 6;
        /**
         * Descontos absolutos aplicados à cobrança. `Array of objects`
         */
        descontoDataFixa: {
            data: `${string}-${string}-${string}`;
            /**
             * Abatimentos ou outras deduções aplicadas ao documento, em valor absoluto ou percentual do valor original do documento. `string \d{1,10}\.\d{2}`
             */
            valorPerc: string;
        }[];
    };
};
/**
 * Identificador da localização do payload. Para associar a location a uma cobrança com vencimento, este location gerado deve ser do tipo cobv.
 */
type LocRequest = {
    /**
     * id do location a ser associada a cobrança com vencimento. int
     */
    id: number;
};

interface PixDueChargeCreateProps {
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
    txid: TxId$2;
    body: {
        /**
         * Os campos aninhados sob o identificador calendário organizam informações a respeito de controle de tempo da cobrança.
         */
        calendario: CalendarioRequest$1;
        /**
         * Os campos aninhados sob o objeto devedor são opcionais e identificam o devedor, ou seja, a pessoa ou a instituição a quem a cobrança está endereçada. Não identifica, necessariamente, quem irá efetivamente realizar o pagamento. Um CPF pode ser o devedor de uma cobrança, mas pode acontecer de outro CPF realizar, efetivamente, o pagamento do documento. Não é permitido que o campo pagador.cpf e campo pagador.cnpj estejam preenchidos ao mesmo tempo. Se o campo pagador.cnpj está preenchido, então o campo pagador.cpf não pode estar preenchido, e vice-versa. Se o campo pagador.nome está preenchido, então deve existir ou um pagador.cpf ou um campo pagador.cnpj preenchido.
         *
         * - Pessoa Física (object) or Pessoa Jurídica (object)
         */
        devedor: Devedor$1;
        /**
         * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
         */
        valor: Valor$2;
        /**
         * Identificador da localização do payload. Para associar a location a uma cobrança com vencimento, este location gerado deve ser do tipo cobv.
         */
        loc?: LocRequest;
        /**
         * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
         *
         * - string (Chave DICT do recebedor) `≤ 77 characters`
         */
        chave: Chave;
        /**
         * O campo solicitacaoPagador, opcional, determina um texto a ser apresentado ao pagador para que ele possa digitar uma informação correlata, em formato livre, a ser enviada ao recebedor. Esse texto será preenchido, na pacs.008, pelo PSP do pagador, no campo RemittanceInformation . O tamanho do campo na pacs.008 está limitado a 140 caracteres.
         *
         * - string (Solicitação ao pagador) `≤ 140 characters`
         */
        solicitacaoPagador?: SolicitacaoPagador;
        /**
         * Cada respectiva informação adicional contida na lista (nome e valor) deve ser apresentada ao pagador.
         */
        infoAdicionais?: InfoAdicionais;
    };
}
interface PixDueChargeUpdateProps {
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
    txid: TxId$2;
    body: {
        /**
         * Os campos aninhados sob o identificador calendário organizam informações a respeito de controle de tempo da cobrança.
         */
        calendario?: CalendarioRequest$1;
        /**
         * Identificador da localização do payload. Para associar a location a uma cobrança com vencimento, este location gerado deve ser do tipo cobv.
         */
        loc?: LocRequest;
        /**
         * Os campos aninhados sob o objeto devedor são opcionais e identificam o devedor, ou seja, a pessoa ou a instituição a quem a cobrança está endereçada. Não identifica, necessariamente, quem irá efetivamente realizar o pagamento. Um CPF pode ser o devedor de uma cobrança, mas pode acontecer de outro CPF realizar, efetivamente, o pagamento do documento. Não é permitido que o campo pagador.cpf e campo pagador.cnpj estejam preenchidos ao mesmo tempo. Se o campo pagador.cnpj está preenchido, então o campo pagador.cpf não pode estar preenchido, e vice-versa. Se o campo pagador.nome está preenchido, então deve existir ou um pagador.cpf ou um campo pagador.cnpj preenchido.
         *
         * - Pessoa Física (object) or Pessoa Jurídica (object)
         */
        devedor?: Partial<Devedor$1>;
        /**
         * Status do registro da cobrança. String
         */
        status?: 'REMOVIDA_PELO_USUARIO_RECEBEDOR';
        /**
         * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
         */
        valor?: Partial<Valor$2>;
        /**
         * O campo solicitacaoPagador, opcional, determina um texto a ser apresentado ao pagador para que ele possa digitar uma informação correlata, em formato livre, a ser enviada ao recebedor. Esse texto será preenchido, na pacs.008, pelo PSP do pagador, no campo RemittanceInformation . O tamanho do campo na pacs.008 está limitado a 140 caracteres.
         *
         * - string (Solicitação ao pagador) `≤ 140 characters`
         */
        solicitacaoPagador?: SolicitacaoPagador;
        /**
         * Cada respectiva informação adicional contida na lista (nome e valor) deve ser apresentada ao pagador.
         */
        infoAdicionais?: InfoAdicionais;
    };
}
interface PixDueChargeFindUniqueProps {
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
    txid: TxId$2;
    searchParams?: {
        /**
         * Permite recuperar revisões anteriores de uma cobrança. Na ausência desse parâmetro, sempre será retornada a cobrança conforme consta em sua última revisão.
         *
         * - integer($int32)
         */
        revisao?: Revisao;
    };
}
interface PixDueChargeFindManyProps extends PixFilterSearchProps {
}
/**
 * Resposta padrão de uma cobrança pix do tipo DueCharge
 */
interface PixDueChargeResponseType {
    /**
     * Os campos aninhados sob o identificador **calendário** organizam informações a respeito de controle de tempo da cobrança.
     */
    calendario: CalendarioResponse$1;
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
    txid: TxId$2;
    /**
     * Permite recuperar revisões anteriores de uma cobrança. Na ausência desse parâmetro, sempre será retornada a cobrança conforme consta em sua última revisão.
     *
     * - integer($int32)
     */
    revisao: Revisao;
    loc: Loc<'cobv'>;
    /**
     * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
     */
    location: Location$1;
    status: Status$2;
    /**
     * Os campos aninhados sob o objeto devedor são opcionais e identificam o devedor, ou seja, a pessoa ou a instituição a quem a cobrança está endereçada. Não identifica, necessariamente, quem irá efetivamente realizar o pagamento. Um CPF pode ser o devedor de uma cobrança, mas pode acontecer de outro CPF realizar, efetivamente, o pagamento do documento. Não é permitido que o campo pagador.cpf e campo pagador.cnpj estejam preenchidos ao mesmo tempo. Se o campo pagador.cnpj está preenchido, então o campo pagador.cpf não pode estar preenchido, e vice-versa. Se o campo pagador.nome está preenchido, então deve existir ou um pagador.cpf ou um campo pagador.cnpj preenchido.
     *
     * - Pessoa Física (object) or Pessoa Jurídica (object)
     */
    devedor: Devedor$1;
    /**
     * Os campos aninhados sob o objeto devedor são opcionais e identificam o recebedor, ou seja, a pessoa ou a instituição a quem será beneficiada. Não é permitido que o campo recebedor.cpf e campo recebedor.cnpj estejam preenchidos ao mesmo tempo. Se o campo recebedor.cnpj está preenchido, então o campo recebedor.cpf não pode estar preenchido, e vice-versa. Se o campo recebedor.nome está preenchido, então deve existir ou um recebedor.cpf ou um campo recebedor.cnpj preenchido.
     *
     * - Pessoa Física (object) or Pessoa Jurídica (object)
     */
    recebedor: Recebedor;
    /**
     * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
     */
    valor: Valor$2;
    /**
     * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
     *
     * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
     *
     * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
     *
     * - string (Chave DICT do recebedor) `≤ 77 characters`
     */
    chave: Chave;
    /**
     * O campo solicitacaoPagador, opcional, determina um texto a ser apresentado ao pagador para que ele possa digitar uma informação correlata, em formato livre, a ser enviada ao recebedor. Esse texto será preenchido, na pacs.008, pelo PSP do pagador, no campo RemittanceInformation . O tamanho do campo na pacs.008 está limitado a 140 caracteres.
     *
     * - string (Solicitação ao pagador) `≤ 140 characters`
     */
    solicitacaoPagador: SolicitacaoPagador;
    pixCopiaECola: string;
}

/**
 * O campo id determina o Id do lote de cobranças com vencimento.
 *
 * - `integer (int64)`
 */
type BatchCollectionId = number

/**
 * Descrição do lote.
 */
type BatchCollectionDescription = string

/**
 * O objeto cobsv organiza as informações dos dados enviados para criação ou alteração da cobrança com vencimento via API Pix.
 */
type Cobvs = (PixDueChargeCreateProps['body'] & {
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
  txid: TxId$2
})[]

type Status$1 = 'EM_PROCESSAMENTO' | 'CRIADA' | 'NEGADA'

interface PixBatchCollectionsCreateOrUpdateDueChargeBatchProps {
  /**
   * O campo id determina o Id do lote de cobranças com vencimento.
   *
   * - `integer (int64)`
   */
  id: BatchCollectionId
  body: {
    /**
     * Descrição do lote.
     */
    descricao: BatchCollectionDescription
    /**
     * O objeto cobsv organiza as informações dos dados enviados para criação ou alteração da cobrança com vencimento via API Pix.
     */
    cobsv: Cobvs
  }
}

interface PixBatchCollectionsUpdateDueChargeBatchProps {
  /**
   * O campo id determina o Id do lote de cobranças com vencimento.
   *
   * - `integer (int64)`
   */
  id: BatchCollectionId
  body: {
    /**
     * Descrição do lote.
     */
    descricao?: BatchCollectionDescription
    /**
     * O objeto cobsv organiza as informações dos dados enviados para criação ou alteração da cobrança com vencimento via API Pix.
     */
    cobsv: Cobvs
  }
}

interface PixBatchCollectionsFindUniqueDueChargeBatchProps {
  /**
   * O campo id determina o Id do lote de cobranças com vencimento.
   *
   * - `integer (int64)`
   */
  id: BatchCollectionId
}

interface PixBatchCollectionsFindManyDueChargeBatchProps {
  searchParams: Omit<PixFilterSearchParamsProps, 'status'> & {
    status?: Status$1
  }
}

interface PixBatchCollectionsBatchResponseType {
  descricao: 'teste'
  /**
   * Data de criação do Lote de Cobrança
   *
   * ISO String no formato `{year}-{month}-{day}T{hour}:{minute}:{seconds}.{milliseconds}Z`
   */
  criacao: string
  cobsv: {
    /**
     * Data de criação da cobrança com vencimento
     *
     * ISO String no formato `{year}-{month}-{day}T{hour}:{minute}:{seconds}.{milliseconds}Z`
     */
    criacao?: string

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
    status: Status$1
    /**
     * Esta propriedade se apresenta apenas quando há uma rejeição durante a criação da cobrança
     */
    problema?: {
      type: string
      /** Título que representa a rejeição */
      title: string
      status: number
      /** Descrição sobre a rejeição */
      detail: string
      /**
       * Violações cometidas para que a rejeição ocorresse
       */
      violacoes: [
        {
          /**
           * Descrição da violação
           */
          razao: string
          /**
           * Campo que originou a violação
           */
          propriedade: string
        },
      ]
    }
  }[]
}

declare class PixBatchCollectionsCreateOrUpdateDueChargeResponse extends ApiResponse {
    #private;
    constructor(props: '');
    get success(): boolean;
    toObject(): boolean;
}

interface IdProp {
    size: number;
    value?: string;
}
declare class Id {
    #private;
    constructor({ size, value }: IdProp);
    get value(): string;
    protected generateNew(size?: number): string;
}

/**
 * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
 *
 * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
 * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
 */
declare class TxId$1 extends Id {
    constructor(id?: string);
    generate(): string;
}

declare class PixBatchCollectionsCobv extends ApiResponse {
    #private;
    constructor(props: PixBatchCollectionsBatchResponseType['cobsv'][0]);
    /**
     * Data de criação da cobrança com vencimento
     *
     * ISO String no formato `{year}-{month}-{day}T{hour}:{minute}:{seconds}.{milliseconds}Z`
     */
    get criacao(): dayjs.Dayjs;
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
    get txid(): TxId$1;
    /**
     * Esta propriedade se apresenta apenas quando há uma rejeição durante a criação da cobrança
     */
    get problema(): {
        type: string;
        /** Título que representa a rejeição */
        title: string;
        status: number;
        /** Descrição sobre a rejeição */
        detail: string;
        /**
         * Violações cometidas para que a rejeição ocorresse
         */
        violacoes: {
            razao: string;
            propriedade: string;
        }[];
    } | undefined;
    get status(): Status$1;
    toObject(): {
        criacao: Date;
        txid: string;
        problema: {
            type: string;
            /** Título que representa a rejeição */
            title: string;
            status: number;
            /** Descrição sobre a rejeição */
            detail: string;
            /**
             * Violações cometidas para que a rejeição ocorresse
             */
            violacoes: {
                razao: string;
                propriedade: string;
            }[];
        } | undefined;
        status: Status$1;
    };
}
declare class PixBatchCollectionsResponse extends ApiResponse {
    #private;
    constructor(props: PixBatchCollectionsBatchResponseType);
    get descricao(): string;
    /**
     * Data de criação do Lote de Cobrança
     *
     * Objeto `dayjs`
     */
    get criacao(): dayjs.Dayjs;
    get cobsv(): PixBatchCollectionsCobv[];
    toObject(): {
        descricao: string;
        criacao: Date;
        cobsv: {
            criacao: Date;
            txid: string;
            problema: {
                type: string;
                /** Título que representa a rejeição */
                title: string;
                status: number;
                /** Descrição sobre a rejeição */
                detail: string;
                /**
                 * Violações cometidas para que a rejeição ocorresse
                 */
                violacoes: {
                    razao: string;
                    propriedade: string;
                }[];
            } | undefined;
            status: Status$1;
        }[];
    };
}

declare class PixBatchCollectionsResponseArray extends ApiArrayResponse<typeof PixBatchCollectionsResponse> {
    constructor(props: PixChargeResponseTypeArray<PixBatchCollectionsBatchResponseType, 'lotes'>);
    get lotes(): PixBatchCollectionsResponse[];
    toObject(): {
        parametros: {
            inicio: Date;
            fim: Date;
            paginaAtual: number;
            itensPorPagina: number;
            quantidadeDePaginas: number;
            quantidadeTotalDeItens: number;
        };
        lotes: {
            descricao: string;
            criacao: Date;
            cobsv: {
                criacao: Date;
                txid: string;
                problema: {
                    type: string;
                    title: string;
                    status: number;
                    detail: string;
                    violacoes: {
                        razao: string;
                        propriedade: string;
                    }[];
                } | undefined;
                status: Status$1;
            }[];
        }[];
    };
}

/**
 * Responsável pela gestão de cobranças em lote. As cobranças, no contexto da API Pix, representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
 */
declare class PixBatchCollections<type extends EnvironmentTypes> extends ApiRequest<type, 'PIX'> {
    /**
     *
     * ---
     *
     * Criar ou alterar um lote de cobranças com vencimento.
     *
     * ---
     *
     * ### Informação
     *
     * Uma solicitação de criação de cobrança com status "EM_PROCESSAMENTO" ou "NEGADA" está associada a uma cobrança não existe de fato, portanto não será listada em `GET /cobv` ou `GET /cobv/:txid`.
     *
     * Uma cobrança, uma vez criada via `PUT /cobv/:txid`, não pode ser associada a um lote posteriormente.
     *
     * Uma cobrança, uma vez criada via PUT `/lotecobv/:id`, não pode ser associada a um novo lote posteriormente.
     *
     * A criação do lote deve conter pelo menos **1** cobrança e no máximo **1000**.
     *
     * ---
     *
     * ### Dica
     *
     * Após a geração da cobrança em lote, você pode utilizar o endpoint de [Consultar lista de cobranças com vencimento](https://dev.efipay.com.br/docs/api-pix/cobrancas-com-vencimento#consultar-lista-de-cobran%C3%A7as-com-vencimento), informado o parâmetro `loteCobvId` para retornar as informações do lote.
     *
     * ---
     *
     * @param PixBatchCollectionsCreateOrUpdateDueChargeBatchProps
     * @returns `PixBatchCollectionsCreateOrUpdateDueChargeResponse | null`
     */
    createOrUpdateDueChargeBatch({ body, id, }: PixBatchCollectionsCreateOrUpdateDueChargeBatchProps): Promise<PixBatchCollectionsCreateOrUpdateDueChargeResponse | null>;
    /**
     *
     * ---
     *
     * Revisar cobranças específicas dentro de um lote de cobranças com vencimento.
     *
     * ---
     *
     * ### Informação
     *
     * A diferença deste endpoint para o endpoint PUT (**`createOrUpdateDueChargeBatch`**) correlato é que este endpoint admite um array cobsv com menos solicitações de criação ou alteração de cobranças do que o array atribuído na requisição originária do lote.
     *
     * Não se pode, entretanto, utilizar esse endpoint para agregar ou remover solicitações de alteração ou criação de cobranças conforme constam na requisição originária do lote.
     *
     * ---
     *
     * @param PixBatchCollectionsUpdateDueChargeBatchProps
     * @returns `PixBatchCollectionsCreateOrUpdateDueChargeResponse | null`
     */
    updateDueChargeBatch({ body, id, }: PixBatchCollectionsUpdateDueChargeBatchProps): Promise<PixBatchCollectionsCreateOrUpdateDueChargeResponse | null>;
    /**
     *
     * ---
     *
     * Consultar um lote específico de cobranças com vencimento.
     *
     * ---
     *
     * @param PixBatchCollectionsFindUniqueDueChargeBatchProps
     * @returns `PixBatchCollectionsResponse | null`
     */
    findUniqueDueChargeBatch({ id, }: PixBatchCollectionsFindUniqueDueChargeBatchProps): Promise<PixBatchCollectionsResponse | null>;
    /**
     *
     * ---
     *
     * Consultar cobranças com vencimento através de parâmetros como início, fim, cpf, cnpj e status.
     *
     * ---
     *
     * @param PixBatchCollectionsFindManyDueChargeBatchProps
     * @returns `PixBatchCollectionsResponseArray | null`
     */
    findManyDueChargeBatch({ searchParams, }: PixBatchCollectionsFindManyDueChargeBatchProps): Promise<PixBatchCollectionsResponseArray | null>;
    useCredentials({ clientId, clientSecret, }: {
        clientId: string;
        clientSecret: string;
    }): PixBatchCollections<type>;
}

declare class Cep {
    #private;
    constructor(cep: string);
    get value(): string;
    isValid(): boolean;
    format(): string;
    compareData(cep: Cep): boolean;
}

type AddressRaw = {
    cep: string;
    number: string;
    street: string;
    neighborhood: string;
    complement: string;
    city: string;
    state: StatesShort;
};
interface AddressProps {
    cep: string;
    number: string;
    street: string;
    neighborhood: string;
    complement: string;
    city: string;
    state: StatesShort;
}
declare class Address {
    #private;
    constructor({ cep, number, street, neighborhood, complement, city, state, }: AddressProps);
    get cep(): Cep;
    get number(): string;
    get street(): string;
    get neighborhood(): string;
    get complement(): string;
    get city(): string;
    get state(): State;
    toObject(): AddressRaw;
    get plainText(): string;
    compareData(address: Address): boolean;
}

declare class Cnpj {
    #private;
    constructor(data: string);
    get value(): string;
    isValid(): boolean;
    format(): string;
}

declare class Cpf {
    #private;
    constructor(data: string);
    get value(): string;
    isValid(): boolean;
    format(): string;
}

declare class Email {
    #private;
    constructor(data: string);
    get value(): string;
    isValid(): boolean;
}

type MeioDeNotificacao = 'whatsapp' | 'sms';
type EscoposIntegrados = 'cob.write' | 'cob.read' | 'pix.write' | 'pix.read' | 'webhook.write' | 'webhook.read' | 'payloadlocation.write' | 'payloadlocation.read' | 'gn.pix.evp.write' | 'gn.pix.evp.read' | 'gn.balance.read' | 'gn.settings.write' | 'gn.settings.read' | 'gn.opb.participants.read' | 'gn.opb.payment.pix.send' | 'gn.opb.payment.pix.read' | 'gn.opb.payment.pix.refund' | 'gn.opb.payment.pix.cancel' | 'gn.opb.config.write' | 'gn.opb.config.rea';
interface UserAccountProps {
    clienteFinal: {
        cpf?: string;
        nomeCompleto: string;
        dataNascimento?: `${number}/${number}/${number}`;
        nomeMae?: string;
        celular?: string;
        email?: string;
        cnpj?: string;
        razaoSocial?: string;
        endereco?: {
            cep: string;
            estado: StatesShort;
            cidade: string;
            bairro: string;
            logradouro: string;
            numero: string;
            complemento: string;
        };
    };
    meioDeNotificacao?: MeioDeNotificacao[];
    escoposIntegrados?: EscoposIntegrados[];
}
declare class UserAccount {
    #private;
    constructor(props: UserAccountProps);
    get clienteFinal(): {
        dataNascimento: dayjs.Dayjs;
        cpf?: Cpf;
        nomeCompleto: string;
        nomeMae?: string;
        celular?: string;
        email?: Email;
        razaoSocial?: string;
        cnpj?: Cnpj;
        endereco?: Address;
    };
    get meioDeNotificacao(): MeioDeNotificacao[] | undefined;
    get escoposIntegrados(): EscoposIntegrados[] | undefined;
    toObject(): {
        clienteFinal: {
            celular: string | undefined;
            cpf: string | undefined;
            dataNascimento: `${number}/${number}/${number}`;
            email: string | undefined;
            endereco: {
                bairro: string;
                cep: string;
                cidade: string;
                complemento: string;
                estado: "AM" | "PA" | "RR" | "AP" | "AC" | "RO" | "TO" | "MA" | "PI" | "CE" | "RN" | "PB" | "PE" | "AL" | "SE" | "BA" | "MG" | "ES" | "RJ" | "SP" | "PR" | "SC" | "RS" | "MS" | "MT" | "GO" | "DF";
                logradouro: string;
                numero: string;
            } | undefined;
            nomeCompleto: string;
            nomeMae: string | undefined;
            cnpj: string | undefined;
            razaoSocial: string | undefined;
        };
        escoposIntegrados: EscoposIntegrados[] | undefined;
        meioDeNotificacao: MeioDeNotificacao[] | undefined;
    };
}

type FormatLocales = 'af-ZA' | 'ar-SA' | 'ar-EG' | 'bg-BG' | 'ca-ES' | 'zh-CN' | 'zh-TW' | 'hr-HR' | 'cs-CZ' | 'da-DK' | 'nl-NL' | 'en-US' | 'en-GB' | 'et-EE' | 'fi-FI' | 'fr-FR' | 'de-DE' | 'el-GR' | 'he-IL' | 'hi-IN' | 'hu-HU' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'lv-LV' | 'lt-LT' | 'ms-MY' | 'nb-NO' | 'pl-PL' | 'pt-BR' | 'pt-PT' | 'ro-RO' | 'ru-RU' | 'sr-RS' | 'sk-SK' | 'sl-SI' | 'es-ES' | 'sv-SE' | 'th-TH' | 'tr-TR' | 'uk-UA' | 'vi-VN';
type FormatCurrencies = 'AED' | 'AFN' | 'ALL' | 'AMD' | 'ANG' | 'AOA' | 'ARS' | 'AUD' | 'AWG' | 'AZN' | 'BAM' | 'BBD' | 'BDT' | 'BGN' | 'BHD' | 'BIF' | 'BMD' | 'BND' | 'BOB' | 'BRL' | 'BSD' | 'BTN' | 'BWP' | 'BYN' | 'BYR' | 'BZD' | 'CAD' | 'CDF' | 'CHF' | 'CLF' | 'CLP' | 'CNY' | 'COP' | 'CRC' | 'CUC' | 'CUP' | 'CVE' | 'CZK' | 'DJF' | 'DKK' | 'DOP' | 'DZD' | 'EGP' | 'ERN' | 'ETB' | 'EUR' | 'FJD' | 'FKP' | 'FOK' | 'GBP' | 'GEL' | 'GGP' | 'GHS' | 'GIP' | 'GMD' | 'GNF' | 'GTQ' | 'GYD' | 'HKD' | 'HNL' | 'HRK' | 'HTG' | 'HUF' | 'IDR' | 'ILS' | 'IMP' | 'INR' | 'IQD' | 'IRR' | 'ISK' | 'JEP' | 'JMD' | 'JOD' | 'JPY' | 'KES' | 'KGS' | 'KHR' | 'KID' | 'KMF' | 'KRW' | 'KWD' | 'KYD' | 'KZT' | 'LAK' | 'LBP' | 'LKR' | 'LRD' | 'LSL' | 'LYD' | 'MAD' | 'MDL' | 'MGA' | 'MKD' | 'MMK' | 'MNT' | 'MOP' | 'MRU' | 'MUR' | 'MVR' | 'MWK' | 'MXN' | 'MYR' | 'MZN' | 'NAD' | 'NGN' | 'NIO' | 'NOK' | 'NPR' | 'NZD' | 'OMR' | 'PAB' | 'PEN' | 'PGK' | 'PHP' | 'PKR' | 'PLN' | 'PYG' | 'QAR' | 'RON' | 'RSD' | 'RUB' | 'RWF' | 'SAR' | 'SBD' | 'SCR' | 'SDG' | 'SEK' | 'SGD' | 'SHP' | 'SLE' | 'SLL' | 'SOS' | 'SRD' | 'SSP' | 'STD' | 'STN' | 'SVC' | 'SYP' | 'SZL' | 'THB' | 'TJS' | 'TMT' | 'TND' | 'TOP' | 'TRY' | 'TTD' | 'TVD' | 'TWD' | 'TZS' | 'UAH' | 'UGX' | 'USD' | 'UYU' | 'UZS' | 'VES' | 'VND' | 'VUV' | 'WST' | 'XAF' | 'XCD' | 'XDR' | 'XOF' | 'XPF' | 'YER' | 'ZAR' | 'ZMW' | 'ZWL';
interface MonetaryValueFormatProps {
    locale: FormatLocales;
    currency: FormatCurrencies;
}
interface MonetaryValueToObjectProps {
    formatProps?: Partial<MonetaryValueFormatProps>;
}
declare class MonetaryValue {
    #private;
    constructor(value: number | string);
    get cents(): number;
    get units(): number;
    /**
     * Valor original da cobrança com os centavos separados por ".", exemplo: "10.00"
     */
    get originalValue(): string;
    protected getFormatParameters(props?: Partial<MonetaryValueFormatProps>): {
        locale: FormatLocales;
        currency: FormatCurrencies;
    };
    format(props?: Partial<MonetaryValueFormatProps>): string;
    toObject(props?: MonetaryValueToObjectProps): {
        cents: number;
        units: number;
        /**
         * Valor original da cobrança com os centavos separados por ".", exemplo: "10.00"
         */
        originalValue: string;
        format: string;
    };
}

interface CalendarDueChargeProps {
    criacao: string;
    /** data no formato `YYYY-MM-DD` */
    dataDeVencimento: `${string}-${string}-${string}`;
    validadeAposVencimento: number;
}
declare class CalendarDueCharge {
    #private;
    constructor({ criacao, dataDeVencimento, validadeAposVencimento, }: CalendarDueChargeProps);
    get criacao(): dayjs.Dayjs;
    get dataDeVencimento(): dayjs.Dayjs;
    get validadeAposVencimento(): number;
    /**
     *
     * @returns Retorna a `dataDeVencimento` no formato `YYYY-MM-DD`
     */
    formatDataDeVencimento(): `${string}-${string}-${string}`;
    toObject(): {
        criacao: Date;
        dataDeVencimento: Date;
        validadeAposVencimento: number;
    };
}

/**
 * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
 */
type PixDueChargeResponseTypeValor = PixDueChargeResponseType['valor'];
interface PixDueChargeValueContractProps extends PixDueChargeResponseTypeValor {
}
declare abstract class PixDueChargeValueContract {
    #private;
    constructor(props: PixDueChargeValueContractProps);
    /**
     * Detalhes sobre a transação
     */
    protected get props(): {
        /**
         * Valor original da cobrança.string `\d{1,10}\ .\d{2}`
         */
        original: MonetaryValue;
        /**
         * Multa aplicada à cobrança. `object`
         */
        multa: {
            modalidade: 1 | 2;
            valorPerc: string;
        };
        /**
         * Juros aplicado à cobrança. `object`
         */
        juros: {
            modalidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
            valorPerc: string;
        };
        /**
         * Abatimento aplicado à cobrança. `object`
         */
        abatimento: {
            modalidade: 1 | 2;
            valorPerc: string;
        } | undefined;
        /**
         * Descontos aplicados à cobrança. `object`
         */
        desconto: {
            modalidade: 1 | 2 | 3 | 4 | 5 | 6;
            descontoDataFixa: {
                data: `${string}-${string}-${string}`;
                valorPerc: string;
            }[];
        };
    };
}

declare class PixDueChargeValueDetailsAbatimento extends PixDueChargeValueContract {
    get data(): {
        modalidade: 1 | 2;
        valorPerc: string;
    } | undefined;
    get details(): {
        value: MonetaryValue;
        modalidade: {
            type: "Valor Fixo" | "Valor Percentual";
        };
    } | undefined;
    toObject(props?: {
        formatProps?: MonetaryValueToObjectProps['formatProps'];
    }): {
        data: {
            modalidade: 1 | 2;
            valorPerc: string;
        } | undefined;
        details: {
            modalidade: {
                type: "Valor Fixo" | "Valor Percentual";
            } | undefined;
            value: string | undefined;
        };
    };
}

declare class PixDueChargeValueDetailsDesconto extends PixDueChargeValueContract {
    get data(): {
        modalidade: 1 | 2;
        valorPerc: string;
    } | undefined;
    get details(): {
        modalidade: {
            type: "por antecipação dias corridos" | "por antecipação dias úteis" | "fixo";
            interest: "Percentual" | "Valor";
        };
        descontoDataFixa: {
            data: `${string}-${string}-${string}`;
            value: MonetaryValue;
        }[];
    };
    toObject(props?: {
        formatProps?: MonetaryValueToObjectProps['formatProps'];
    }): {
        data: {
            modalidade: 1 | 2;
            valorPerc: string;
        } | undefined;
        details: {
            modalidade: {
                type: "por antecipação dias corridos" | "por antecipação dias úteis" | "fixo";
                interest: "Percentual" | "Valor";
            };
            value: {
                data: `${string}-${string}-${string}`;
                value: string;
            }[];
        };
    };
}

declare class PixDueChargeValueDetailsJuros extends PixDueChargeValueContract {
    get data(): {
        modalidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
        valorPerc: string;
    };
    get details(): {
        value: MonetaryValue;
        modalidade: {
            type: "dias corridos" | "dias úteis";
            interest: "Percentual" | "Valor";
            periodicity: "dia" | "mês" | "ano";
            format: `${string} ao dia (dias corridos)` | `${string} ao dia (dias \u00FAteis)` | `${string} ao m\u00EAs (dias corridos)` | `${string} ao m\u00EAs (dias \u00FAteis)` | `${string} ao ano (dias corridos)` | `${string} ao ano (dias \u00FAteis)`;
        };
    };
    toObject(props?: {
        formatProps?: MonetaryValueToObjectProps['formatProps'];
    }): {
        data: {
            modalidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
            valorPerc: string;
        };
        details: {
            modalidade: {
                type: "dias corridos" | "dias úteis";
                interest: "Percentual" | "Valor";
                periodicity: "dia" | "mês" | "ano";
                format: `${string} ao dia (dias corridos)` | `${string} ao dia (dias \u00FAteis)` | `${string} ao m\u00EAs (dias corridos)` | `${string} ao m\u00EAs (dias \u00FAteis)` | `${string} ao ano (dias corridos)` | `${string} ao ano (dias \u00FAteis)`;
            };
            value: string;
        };
    };
}

declare class PixDueChargeValueDetailsMulta extends PixDueChargeValueContract {
    get data(): {
        modalidade: 1 | 2;
        valorPerc: string;
    };
    get details(): MonetaryValue;
    toObject(props?: {
        formatProps?: MonetaryValueToObjectProps['formatProps'];
    }): {
        data: {
            modalidade: 1 | 2;
            valorPerc: string;
        };
        details: {
            cents: number;
            units: number;
            originalValue: string;
            format: string;
        };
    };
}

declare class PixDueChargeValueDetails extends PixDueChargeValueContract {
    #private;
    constructor(props: PixDueChargeValueContractProps);
    get multa(): PixDueChargeValueDetailsMulta;
    get juros(): PixDueChargeValueDetailsJuros;
    get abatimento(): PixDueChargeValueDetailsAbatimento;
    get desconto(): PixDueChargeValueDetailsDesconto;
    toObject(props?: {
        formatProps?: MonetaryValueToObjectProps['formatProps'];
    }): {
        multa: {
            data: {
                modalidade: 1 | 2;
                valorPerc: string;
            };
            details: {
                cents: number;
                units: number;
                originalValue: string;
                format: string;
            };
        };
        juros: {
            data: {
                modalidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
                valorPerc: string;
            };
            details: {
                modalidade: {
                    type: "dias corridos" | "dias úteis";
                    interest: "Percentual" | "Valor";
                    periodicity: "dia" | "mês" | "ano";
                    format: `${string} ao dia (dias corridos)` | `${string} ao dia (dias \u00FAteis)` | `${string} ao m\u00EAs (dias corridos)` | `${string} ao m\u00EAs (dias \u00FAteis)` | `${string} ao ano (dias corridos)` | `${string} ao ano (dias \u00FAteis)`;
                };
                value: string;
            };
        };
        abatimento: {
            data: {
                modalidade: 1 | 2;
                valorPerc: string;
            } | undefined;
            details: {
                modalidade: {
                    type: "Valor Fixo" | "Valor Percentual";
                } | undefined;
                value: string | undefined;
            };
        };
        desconto: {
            data: {
                modalidade: 1 | 2;
                valorPerc: string;
            } | undefined;
            details: {
                modalidade: {
                    type: "por antecipação dias corridos" | "por antecipação dias úteis" | "fixo";
                    interest: "Percentual" | "Valor";
                };
                value: {
                    data: `${string}-${string}-${string}`;
                    value: string;
                }[];
            };
        };
    };
}

interface PixDueChargeValueProps extends PixDueChargeValueContractProps {
}
declare class PixDueChargeValue extends PixDueChargeValueContract {
    #private;
    constructor(props: PixDueChargeValueProps);
    get details(): PixDueChargeValueDetails;
    get value(): MonetaryValue;
    toObject(props?: {
        formatProps?: MonetaryValueToObjectProps['formatProps'];
    }): {
        details: {
            multa: {
                data: {
                    modalidade: 1 | 2;
                    valorPerc: string;
                };
                details: {
                    cents: number;
                    units: number;
                    originalValue: string;
                    format: string;
                };
            };
            juros: {
                data: {
                    modalidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
                    valorPerc: string;
                };
                details: {
                    modalidade: {
                        type: "dias corridos" | "dias úteis";
                        interest: "Percentual" | "Valor";
                        periodicity: "dia" | "mês" | "ano";
                        format: `${string} ao dia (dias corridos)` | `${string} ao dia (dias \u00FAteis)` | `${string} ao m\u00EAs (dias corridos)` | `${string} ao m\u00EAs (dias \u00FAteis)` | `${string} ao ano (dias corridos)` | `${string} ao ano (dias \u00FAteis)`;
                    };
                    value: string;
                };
            };
            abatimento: {
                data: {
                    modalidade: 1 | 2;
                    valorPerc: string;
                } | undefined;
                details: {
                    modalidade: {
                        type: "Valor Fixo" | "Valor Percentual";
                    } | undefined;
                    value: string | undefined;
                };
            };
            desconto: {
                data: {
                    modalidade: 1 | 2;
                    valorPerc: string;
                } | undefined;
                details: {
                    modalidade: {
                        type: "por antecipação dias corridos" | "por antecipação dias úteis" | "fixo";
                        interest: "Percentual" | "Valor";
                    };
                    value: {
                        data: `${string}-${string}-${string}`;
                        value: string;
                    }[];
                };
            };
        };
        value: string;
    };
}

declare class PixDueChargeResponse extends ApiResponse {
    #private;
    constructor(props: PixDueChargeResponseType);
    get calendario(): CalendarDueCharge;
    get txid(): TxId$1;
    get revisao(): number;
    get loc(): PixLocation<"cobv">;
    /**
     * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
     */
    get location(): string;
    get status(): Status$2;
    get devedor(): UserAccount;
    get valor(): PixDueChargeValue;
    get chave(): string;
    get solicitacaoPagador(): string;
    get pixCopiaECola(): string;
    toObject(props?: {
        valueFormat?: MonetaryValueToObjectProps['formatProps'];
    }): {
        calendario: {
            criacao: Date;
            dataDeVencimento: Date;
            validadeAposVencimento: number;
        };
        /**
         * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
         *
         * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
         * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
         */
        txid: string;
        revisao: number;
        loc: {
            id: number;
            location: string;
            tipoCob: "cobv";
            criacao: Date | undefined;
        };
        /**
         * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
         */
        location: string;
        status: Status$2;
        devedor: {
            clienteFinal: {
                celular: string | undefined;
                cpf: string | undefined;
                dataNascimento: `${number}/${number}/${number}`;
                email: string | undefined;
                endereco: {
                    bairro: string;
                    cep: string;
                    cidade: string;
                    complemento: string;
                    estado: "AM" | "PA" | "RR" | "AP" | "AC" | "RO" | "TO" | "MA" | "PI" | "CE" | "RN" | "PB" | "PE" | "AL" | "SE" | "BA" | "MG" | "ES" | "RJ" | "SP" | "PR" | "SC" | "RS" | "MS" | "MT" | "GO" | "DF";
                    logradouro: string;
                    numero: string;
                } | undefined;
                nomeCompleto: string;
                nomeMae: string | undefined;
                cnpj: string | undefined;
                razaoSocial: string | undefined;
            };
            escoposIntegrados: ("cob.write" | "cob.read" | "pix.write" | "pix.read" | "webhook.write" | "webhook.read" | "payloadlocation.write" | "payloadlocation.read" | "gn.pix.evp.write" | "gn.pix.evp.read" | "gn.balance.read" | "gn.settings.write" | "gn.settings.read" | "gn.opb.participants.read" | "gn.opb.payment.pix.send" | "gn.opb.payment.pix.read" | "gn.opb.payment.pix.refund" | "gn.opb.payment.pix.cancel" | "gn.opb.config.write" | "gn.opb.config.rea")[] | undefined;
            meioDeNotificacao: ("whatsapp" | "sms")[] | undefined;
        };
        valor: {
            details: {
                multa: {
                    data: {
                        modalidade: 1 | 2;
                        valorPerc: string;
                    };
                    details: {
                        cents: number;
                        units: number;
                        originalValue: string;
                        format: string;
                    };
                };
                juros: {
                    data: {
                        modalidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
                        valorPerc: string;
                    };
                    details: {
                        modalidade: {
                            type: "dias corridos" | "dias úteis";
                            interest: "Percentual" | "Valor";
                            periodicity: "dia" | "mês" | "ano";
                            format: `${string} ao dia (dias corridos)` | `${string} ao dia (dias \u00FAteis)` | `${string} ao m\u00EAs (dias corridos)` | `${string} ao m\u00EAs (dias \u00FAteis)` | `${string} ao ano (dias corridos)` | `${string} ao ano (dias \u00FAteis)`;
                        };
                        value: string;
                    };
                };
                abatimento: {
                    data: {
                        modalidade: 1 | 2;
                        valorPerc: string;
                    } | undefined;
                    details: {
                        modalidade: {
                            type: "Valor Fixo" | "Valor Percentual";
                        } | undefined;
                        value: string | undefined;
                    };
                };
                desconto: {
                    data: {
                        modalidade: 1 | 2;
                        valorPerc: string;
                    } | undefined;
                    details: {
                        modalidade: {
                            type: "por antecipação dias corridos" | "por antecipação dias úteis" | "fixo";
                            interest: "Percentual" | "Valor";
                        };
                        value: {
                            data: `${string}-${string}-${string}`;
                            value: string;
                        }[];
                    };
                };
            };
            value: string;
        };
        chave: string;
        solicitacaoPagador: string;
        pixCopiaECola: string;
    };
}

declare class PixDueChargeResponseArray extends ApiArrayResponse<typeof PixDueChargeResponse> {
    constructor(props: PixChargeResponseTypeArray<PixDueChargeResponseType>);
    get cobs(): PixDueChargeResponse[];
    toObject(): {
        parametros: {
            inicio: Date;
            fim: Date;
            paginaAtual: number;
            itensPorPagina: number;
            quantidadeDePaginas: number;
            quantidadeTotalDeItens: number;
        };
        cobs: {
            calendario: {
                criacao: Date;
                dataDeVencimento: Date;
                validadeAposVencimento: number;
            };
            txid: string;
            revisao: number;
            loc: {
                id: number;
                location: string;
                tipoCob: "cobv";
                criacao: Date | undefined;
            };
            location: string;
            status: Status$2;
            devedor: {
                clienteFinal: {
                    celular: string | undefined;
                    cpf: string | undefined;
                    dataNascimento: `${number}/${number}/${number}`;
                    email: string | undefined;
                    endereco: {
                        bairro: string;
                        cep: string;
                        cidade: string;
                        complemento: string;
                        estado: "AM" | "PA" | "RR" | "AP" | "AC" | "RO" | "TO" | "MA" | "PI" | "CE" | "RN" | "PB" | "PE" | "AL" | "SE" | "BA" | "MG" | "ES" | "RJ" | "SP" | "PR" | "SC" | "RS" | "MS" | "MT" | "GO" | "DF";
                        logradouro: string;
                        numero: string;
                    } | undefined;
                    nomeCompleto: string;
                    nomeMae: string | undefined;
                    cnpj: string | undefined;
                    razaoSocial: string | undefined;
                };
                escoposIntegrados: ("cob.write" | "cob.read" | "pix.write" | "pix.read" | "webhook.write" | "webhook.read" | "payloadlocation.write" | "payloadlocation.read" | "gn.pix.evp.write" | "gn.pix.evp.read" | "gn.balance.read" | "gn.settings.write" | "gn.settings.read" | "gn.opb.participants.read" | "gn.opb.payment.pix.send" | "gn.opb.payment.pix.read" | "gn.opb.payment.pix.refund" | "gn.opb.payment.pix.cancel" | "gn.opb.config.write" | "gn.opb.config.rea")[] | undefined;
                meioDeNotificacao: ("whatsapp" | "sms")[] | undefined;
            };
            valor: {
                details: {
                    multa: {
                        data: {
                            modalidade: 1 | 2;
                            valorPerc: string;
                        };
                        details: {
                            cents: number;
                            units: number;
                            originalValue: string;
                            format: string;
                        };
                    };
                    juros: {
                        data: {
                            modalidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
                            valorPerc: string;
                        };
                        details: {
                            modalidade: {
                                type: "dias corridos" | "dias úteis";
                                interest: "Percentual" | "Valor";
                                periodicity: "dia" | "mês" | "ano";
                                format: `${string} ao dia (dias corridos)` | `${string} ao dia (dias \u00FAteis)` | `${string} ao m\u00EAs (dias corridos)` | `${string} ao m\u00EAs (dias \u00FAteis)` | `${string} ao ano (dias corridos)` | `${string} ao ano (dias \u00FAteis)`;
                            };
                            value: string;
                        };
                    };
                    abatimento: {
                        data: {
                            modalidade: 1 | 2;
                            valorPerc: string;
                        } | undefined;
                        details: {
                            modalidade: {
                                type: "Valor Fixo" | "Valor Percentual";
                            } | undefined;
                            value: string | undefined;
                        };
                    };
                    desconto: {
                        data: {
                            modalidade: 1 | 2;
                            valorPerc: string;
                        } | undefined;
                        details: {
                            modalidade: {
                                type: "por antecipação dias corridos" | "por antecipação dias úteis" | "fixo";
                                interest: "Percentual" | "Valor";
                            };
                            value: {
                                data: `${string}-${string}-${string}`;
                                value: string;
                            }[];
                        };
                    };
                };
                value: string;
            };
            chave: string;
            solicitacaoPagador: string;
            pixCopiaECola: string;
        }[];
    };
}

/**
 * responsável pela gestão de cobranças imediatas. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
 */
declare class PixDueCharge<type extends EnvironmentTypes> extends ApiRequest<type, 'PIX'> {
    /**
     * Cadastrar uma cobrança com vencimento e um identificador de transação (`txid`).
     *
     * @param PixDueChargeCreateProps
     * @returns `PixDueChargeResponse | null`
     */
    create({ body, txid }: PixDueChargeCreateProps): Promise<PixDueChargeResponse | null>;
    /**
     * Revisar (modificar) uma cobrança a partir do seu `txid`.
     *
     * @param PixDueChargeUpdateProps
     * @returns `PixDueChargeResponse | null`
     */
    update({ body, txid }: PixDueChargeUpdateProps): Promise<PixDueChargeResponse | null>;
    /**
     * Consultar uma cobrança com vencimento a partir do `txid`.
     *
     * @param PixDueChargeFindUniqueProps
     * @returns `PixDueChargeResponse | null`
     */
    findUnique({ searchParams, txid }: PixDueChargeFindUniqueProps): Promise<PixDueChargeResponse | null>;
    /**
     * Consultar cobranças com vencimento através de parâmetros como início, fim, cpf, cnpj e status.
     *
     * @param PixDueChargeFindManyProps
     * @returns `PixDueChargeResponseArray | null`
     */
    findMany({ searchParams }: PixDueChargeFindManyProps): Promise<PixDueChargeResponseArray | null>;
    useCredentials({ clientId, clientSecret, }: {
        clientId: string;
        clientSecret: string;
    }): PixDueCharge<type>;
}

interface CalendarImediateChargeProps {
    criacao: string;
    expiracao: number;
}
declare class CalendarImediateCharge {
    #private;
    constructor({ criacao, expiracao }: CalendarImediateChargeProps);
    get criacao(): dayjs.Dayjs;
    get expiracao(): number;
    getExpirationDate(): dayjs.Dayjs;
    toObject(): {
        criacao: Date;
        expiracao: number;
    };
}

/**
 * Os campos aninhados sob o identificador calendário organizam informações a respeito de controle de tempo da cobrança.
 */
type CalendarioRequest = {
  /**
   * Tempo de vida da cobrança, especificado em segundos a partir da data de criação (Calendario.criacao). Recebe um numero com valor mínimo de 1 e máximo integer int32, passado como integer.
   */
  expiracao: number
}

/**
 * Os campos aninhados sob o objeto devedor são opcionais e identificam o devedor, ou seja, a pessoa ou a instituição a quem a cobrança está endereçada. Não identifica, necessariamente, quem irá efetivamente realizar o pagamento. Um CPF pode ser o devedor de uma cobrança, mas pode acontecer de outro CPF realizar, efetivamente, o pagamento do documento. Não é permitido que o campo pagador.cpf e campo pagador.cnpj estejam preenchidos ao mesmo tempo. Se o campo pagador.cnpj está preenchido, então o campo pagador.cpf não pode estar preenchido, e vice-versa. Se o campo pagador.nome está preenchido, então deve existir ou um pagador.cpf ou um campo pagador.cnpj preenchido.
 *
 * - Pessoa Física (object) or Pessoa Jurídica (object)
 */
type Devedor = {
  /**
   * CPF do usuário pagador.string `/^\d{11}$/`
   */
  cpf?: string
  /**
   * CNPJ do usuário pagador.string `/^\d{14}$/`
   */
  cnpj?: string
  /**
   * Nome do usuário pagador. string (Nome) `≤ 200 characters`
   */
  nome: string
}

/**
 * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
 */
type Valor$1 = {
  /**
   * Valor original da cobrança.string `\d{1,10}\.\d{2}`
   */
  original: string
}

/**
 * Identificador da localização do payload.
 */
type LocUpdate = {
  /**
   * ID do location a ser associada a cobrança. `int32`
   */
  id: number
}

interface PixImediateChargeCreateProps {
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
  txid?: TxId$2
  searchParams?: Record<string, string>
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
    devedor?: Devedor
    /**
     * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
     */
    valor: Valor$1
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
    solicitacaoPagador?: SolicitacaoPagador
    /**
     * Cada respectiva informação adicional contida na lista (nome e valor) deve ser apresentada ao pagador.
     */
    infoAdicionais?: InfoAdicionais
  }
}

interface PixImediateChargeUpdateProps {
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
  txid: TxId$2
  body: {
    /**
     * Identificador da localização do payload.
     */
    loc?: LocUpdate
    /**
     * Os campos aninhados sob o objeto devedor são opcionais e identificam o devedor, ou seja, a pessoa ou a instituição a quem a cobrança está endereçada. Não identifica, necessariamente, quem irá efetivamente realizar o pagamento. Um CPF pode ser o devedor de uma cobrança, mas pode acontecer de outro CPF realizar, efetivamente, o pagamento do documento. Não é permitido que o campo pagador.cpf e campo pagador.cnpj estejam preenchidos ao mesmo tempo. Se o campo pagador.cnpj está preenchido, então o campo pagador.cpf não pode estar preenchido, e vice-versa. Se o campo pagador.nome está preenchido, então deve existir ou um pagador.cpf ou um campo pagador.cnpj preenchido.
     *
     * - Pessoa Física (object) or Pessoa Jurídica (object)
     */
    devedor?: Devedor
    /**
     * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
     */
    valor?: Valor$1
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

interface PixImediateChargeFindUniqueProps {
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
  txid: TxId$2
  searchParams?: {
    /**
     * Permite recuperar revisões anteriores de uma cobrança. Na ausência desse parâmetro, sempre será retornada a cobrança conforme consta em sua última revisão.
     *
     * - integer($int32)
     */
    revisao?: Revisao
  }
}

interface PixImediateChargeFindManyProps extends PixFilterSearchProps {}

/**
 * Resposta padrão de uma cobrança pix do tipo ImediateCharge
 */
interface PixImediateChargeResponseType {
  /**
   * Os campos aninhados sob o identificador calendário organizam informações a respeito de controle de tempo da cobrança.
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
  txid: TxId$2
  /**
   * Permite recuperar revisões anteriores de uma cobrança. Na ausência desse parâmetro, sempre será retornada a cobrança conforme consta em sua última revisão.
   *
   * - integer($int32)
   */
  revisao: Revisao
  loc: Loc<'cob'>
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
   * Todos os campos que indicam valores monetários obedecem ao formato do ID 54 da especificação EMV/BR Code para QR Codes. O separador decimal é o caractere ponto. Não é aplicável utilizar separador de milhar. Exemplos de valores aderentes ao padrão: “0.00”, “1.00”, “123.99”, “123456789.23”
   */
  valor: Valor$1
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

type PixImediateChargeResponseCreationProps = PixImediateChargeResponseType;
declare class PixImediateChargeResponse extends ApiResponse {
    protected props: {
        calendario: CalendarImediateCharge;
        /**
         * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
         *
         * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
         * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
         */
        txid: TxId$1;
        revisao: number;
        loc: PixLocation<'cob'>;
        /**
         * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
         */
        location: string;
        status: Status$2;
        devedor: UserAccount;
        valor: MonetaryValue;
        chave: string;
        solicitacaoPagador: string;
        pixCopiaECola: string;
    };
    constructor(props: PixImediateChargeResponseCreationProps);
    get calendario(): CalendarImediateCharge;
    get txid(): TxId$1;
    get revisao(): number;
    get loc(): PixLocation<"cob">;
    /**
     * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
     */
    get location(): string;
    get status(): Status$2;
    get devedor(): UserAccount;
    get valor(): MonetaryValue;
    get chave(): string;
    get solicitacaoPagador(): string;
    get pixCopiaECola(): string;
    toObject(props?: {
        valueFormat?: MonetaryValueToObjectProps['formatProps'];
    }): {
        calendario: {
            criacao: Date;
            expiracao: number;
        };
        /**
         * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
         *
         * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
         * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
         */
        txid: string;
        revisao: number;
        loc: {
            id: number;
            location: string;
            tipoCob: "cob";
            criacao: Date | undefined;
        };
        /**
         * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
         */
        location: string;
        status: Status$2;
        devedor: {
            clienteFinal: {
                celular: string | undefined;
                cpf: string | undefined;
                dataNascimento: `${number}/${number}/${number}`;
                email: string | undefined;
                endereco: {
                    bairro: string;
                    cep: string;
                    cidade: string;
                    complemento: string;
                    estado: "AM" | "PA" | "RR" | "AP" | "AC" | "RO" | "TO" | "MA" | "PI" | "CE" | "RN" | "PB" | "PE" | "AL" | "SE" | "BA" | "MG" | "ES" | "RJ" | "SP" | "PR" | "SC" | "RS" | "MS" | "MT" | "GO" | "DF";
                    logradouro: string;
                    numero: string;
                } | undefined;
                nomeCompleto: string;
                nomeMae: string | undefined;
                cnpj: string | undefined;
                razaoSocial: string | undefined;
            };
            escoposIntegrados: ("cob.write" | "cob.read" | "pix.write" | "pix.read" | "webhook.write" | "webhook.read" | "payloadlocation.write" | "payloadlocation.read" | "gn.pix.evp.write" | "gn.pix.evp.read" | "gn.balance.read" | "gn.settings.write" | "gn.settings.read" | "gn.opb.participants.read" | "gn.opb.payment.pix.send" | "gn.opb.payment.pix.read" | "gn.opb.payment.pix.refund" | "gn.opb.payment.pix.cancel" | "gn.opb.config.write" | "gn.opb.config.rea")[] | undefined;
            meioDeNotificacao: ("whatsapp" | "sms")[] | undefined;
        };
        valor: {
            cents: number;
            units: number;
            originalValue: string;
            format: string;
        };
        chave: string;
        solicitacaoPagador: string;
        pixCopiaECola: string;
    };
}

declare class PixImediateChargeResponseArray extends ApiArrayResponse<typeof PixImediateChargeResponse> {
    constructor(props: PixChargeResponseTypeArray<PixImediateChargeResponseType>);
    get cobs(): PixImediateChargeResponse[];
    toObject(): {
        parametros: {
            inicio: Date;
            fim: Date;
            paginaAtual: number;
            itensPorPagina: number;
            quantidadeDePaginas: number;
            quantidadeTotalDeItens: number;
        };
        cobs: {
            calendario: {
                criacao: Date;
                expiracao: number;
            };
            txid: string;
            revisao: number;
            loc: {
                id: number;
                location: string;
                tipoCob: "cob";
                criacao: Date | undefined;
            };
            location: string;
            status: Status$2;
            devedor: {
                clienteFinal: {
                    celular: string | undefined;
                    cpf: string | undefined;
                    dataNascimento: `${number}/${number}/${number}`;
                    email: string | undefined;
                    endereco: {
                        bairro: string;
                        cep: string;
                        cidade: string;
                        complemento: string;
                        estado: "AM" | "PA" | "RR" | "AP" | "AC" | "RO" | "TO" | "MA" | "PI" | "CE" | "RN" | "PB" | "PE" | "AL" | "SE" | "BA" | "MG" | "ES" | "RJ" | "SP" | "PR" | "SC" | "RS" | "MS" | "MT" | "GO" | "DF";
                        logradouro: string;
                        numero: string;
                    } | undefined;
                    nomeCompleto: string;
                    nomeMae: string | undefined;
                    cnpj: string | undefined;
                    razaoSocial: string | undefined;
                };
                escoposIntegrados: ("cob.write" | "cob.read" | "pix.write" | "pix.read" | "webhook.write" | "webhook.read" | "payloadlocation.write" | "payloadlocation.read" | "gn.pix.evp.write" | "gn.pix.evp.read" | "gn.balance.read" | "gn.settings.write" | "gn.settings.read" | "gn.opb.participants.read" | "gn.opb.payment.pix.send" | "gn.opb.payment.pix.read" | "gn.opb.payment.pix.refund" | "gn.opb.payment.pix.cancel" | "gn.opb.config.write" | "gn.opb.config.rea")[] | undefined;
                meioDeNotificacao: ("whatsapp" | "sms")[] | undefined;
            };
            valor: {
                cents: number;
                units: number;
                originalValue: string;
                format: string;
            };
            chave: string;
            solicitacaoPagador: string;
            pixCopiaECola: string;
        }[];
    };
}

/**
 * Responsável pela gestão de cobranças imediatas. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
 */
declare class PixImediateCharge<type extends EnvironmentTypes> extends ApiRequest<type, 'PIX'> {
    /**
     * O txid é criado pelo usuário recebedor e está sob sua responsabilidade. No entanto, caso deseje que o txid será definido pela Efí, basta omitir est informação.
     *
     * @param props ```ts
     * interface PixImediateChargeCreateProps
     * ```
     * @returns ```ts
     * Promise<(interface PixImediateChargeResponse) | null>
     * ```
     */
    create({ txid, body }: PixImediateChargeCreateProps): Promise<PixImediateChargeResponse | null>;
    /**
     * Endpoint para revisar (modificar) uma cobrança a partir do seu `txid`.
     * @param PixImediateChargeUpdateProps
     * @returns `PixImediateChargeResponse | null`
     */
    update({ txid, body }: PixImediateChargeUpdateProps): Promise<PixImediateChargeResponse | null>;
    /**
     * Endpoint para consultar uma cobrança a partir do `txid`.
     * @param PixImediateChargeFindUniqueProps
     * @returns `PixImediateChargeResponseType | null`
     */
    findUnique({ txid, searchParams }: PixImediateChargeFindUniqueProps): Promise<PixImediateChargeResponse | null>;
    /**
     * Endpoint para consultar várias cobranças.
     *
     * Este endpoint possui filtros para afunilar os resultados da busca, tais como CPF/CNPJ e status. Dentre todos os filtros disponíveis, os filtros inicio e fim são obrigatórios e representam o intervalo de datas em que as cobranças consultadas devem estar compreendidas.
     *
     * @param PixImediateChargeResponseArray
     * @returns
     */
    findMany({ searchParams }: PixImediateChargeFindManyProps): Promise<PixImediateChargeResponseArray | null>;
    useCredentials({ clientId, clientSecret, }: {
        clientId: string;
        clientSecret: string;
    }): PixImediateCharge<type>;
}

interface PixManageConsultProps {
    /**
     * EndToEndIdentification que transita na PACS002, PACS004 e PACS008. `32 characters` `^[a-zA-Z0-9]{32}`
     */
    e2eId: E2eId$1;
}
type PixWebhooksConsultManyPropsSearchParams = Omit<PixFilterSearchParamsProps, 'status'> & {
    /**
     * Filtra os Pix recebidos que têm ou não txid associadas
     */
    txIdPresente?: boolean;
    /**
     * Filtra os Pix recebidos que têm ou não devoluções associadas
     */
    devolucaoPresente?: boolean;
};
interface PixWebhooksConsultManyProps {
    searchParams: PixWebhooksConsultManyPropsSearchParams;
}
interface PixWebhooksReturnProps {
    /**
     * EndToEndIdentification que transita na PACS002, PACS004 e PACS008. `32 characters` `^[a-zA-Z0-9]{32}`
     */
    e2eId: E2eId$1;
    /**
     * Id gerado pelo cliente para representar unicamente uma devolução.
     *
     * string `^[a-zA-Z0-9]{32} {1,35}`
     */
    id: string;
    body: {
        /**
         * Valor solicitado para devolução. A soma dos valores de todas as devolucões não podem ultrapassar o valor total do Pix.
         *
         * string `\d{1,10}\.\d{2}`
         */
        valor: string;
    };
}
interface PixWebhooksConsultReturnProps extends Omit<PixWebhooksReturnProps, 'body'> {
}
interface PixManageReturnResponseType {
    id: string;
    rtrId: string;
    /**
     * Valor da devolução
     *
     * string `\d{1,10}\.\d{2}`
     */
    valor: string;
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
        solicitacao: string;
    };
    /**
     * O campo status no retorno do webhook representa a situação da requisição de envio direto de um Pix para uma chave Pix, podendo assumir os seguintes estados:
     *
     * `"EM_PROCESSAMENTO","REALIZADO", "NAO_REALIZADO"`
     */
    status: PixStatus;
}
interface PixManageResponseType {
    /**
     * EndToEndIdentification que transita na PACS002, PACS004 e PACS008. `32 characters` `^[a-zA-Z0-9]{32}`
     */
    endToEndId: E2eId$1;
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
    txid: TxId$2;
    /**
     * Valor da transação
     *
     * string `\d{1,10}\.\d{2}`
     */
    valor: string;
    /**
     * Horário em que a transação foi feita.
     *
     * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
     */
    horario: string;
    infoPagador: string;
    devolucoes?: PixManageReturnResponseType[];
}

/**
 * Determina o identificador da transação.
 *
 * - string (Id da Transação) `^[a-zA-Z0-9]{1,35}$`
 */
declare class E2eId extends Id {
    constructor(id?: string);
    generate(): string;
}

declare class PixManageReturnResponse extends ApiResponse {
    #private;
    constructor(props: PixManageReturnResponseType);
    get id(): string;
    get rtrId(): string;
    /**
     * Valor da devolução
     *
     * string `\d{1,10}\.\d{2}`
     */
    get valor(): MonetaryValue;
    /**
     * Contém o horário em que a devolução foi feita.
     *
     */
    get horario(): {
        /**
         * Horário em que a devolução foi feita.
         *
         * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
         */
        solicitacao: dayjs.Dayjs;
    };
    /**
     * O campo status no retorno do webhook representa a situação da requisição de envio direto de um Pix para uma chave Pix, podendo assumir os seguintes estados:
     *
     * `"EM_PROCESSAMENTO","REALIZADO", "NAO_REALIZADO"`
     */
    get status(): PixStatus;
    toObject(props?: {
        formatProps?: MonetaryValueToObjectProps['formatProps'];
    }): {
        id: string;
        rtrId: string;
        valor: {
            cents: number;
            units: number;
            originalValue: string;
            format: string;
        };
        horario: {
            solicitacao: Date;
        };
        status: PixStatus;
    };
}

declare class PixManageResponse extends ApiResponse {
    #private;
    constructor(props: PixManageResponseType);
    get endToEndId(): E2eId;
    get txid(): TxId$1;
    get valor(): MonetaryValue;
    get horario(): dayjs.Dayjs;
    get infoPagador(): string;
    get devolucoes(): PixManageReturnResponse[] | undefined;
    toObject(props?: {
        formatProps?: MonetaryValueToObjectProps['formatProps'];
    }): {
        endToEndId: string;
        txid: string;
        valor: {
            cents: number;
            units: number;
            originalValue: string;
            format: string;
        };
        horario: Date;
        infoPagador: string;
        devolucoes: {
            id: string;
            rtrId: string;
            valor: {
                cents: number;
                units: number;
                originalValue: string;
                format: string;
            };
            horario: {
                solicitacao: Date;
            };
            status: PixStatus;
        }[] | undefined;
    };
}

/**
 * Gestão das transações Pix, isto é, a manutenção dos recebimentos e devoluções Pix.
 */
declare class PixManage<type extends EnvironmentTypes> extends ApiRequest<type, 'PIX'> {
    /**
     *
     * ---
     *
     *  Consultar um Pix através de um `e2eId`.
     *
     * ---
     *
     * ### Atenção
     * Este endpoint retorna apenas informações sobre Pix recebidos.
     *
     * ---
     *
     * @param PixManageConsultProps
     * @returns `PixManageResponse | null`
     */
    consult({ e2eId }: PixManageConsultProps): Promise<PixManageResponse | null>;
    /**
     *
     * ---
     *
     * Consultar vários Pix recebidos.
     *
     * ---
     *
     * @param PixWebhooksConsultManyProps
     * @returns `PixManageResponse | null`
     */
    consultMany({ searchParams }: PixWebhooksConsultManyProps): Promise<PixManageResponse | null>;
    /**
     *
     * ---
     *
     * Solicitar uma devolução usando o `e2eId` do Pix e o `ID da devolução`. O motivo atribuído à PACS.004 será “Devolução solicitada pelo usuário recebedor do pagamento original”, com a sigla “MD06”, conforme consta na aba RTReason da PACS.004 no Catálogo de Mensagens do Pix.
     *
     * ---
     *
     * ### Instruções
     * Você pode simular a rejeição da devolução usando o valor de **R$ 0,01**. Essas devoluções serão rejeitadas e notificadas para simular o fluxo de produção. Devoluções com valores diferentes de **R$ 0,01**, seguirão o fluxo normal de devolução com várias outras validações. Se estiverem em conformidade, serão confirmadas e notificadas, simulando o fluxo de produção.
     *
     * ---
     *
     * @param PixWebhooksReturnProps
     * @returns `PixManageReturnResponse | null`
     */
    return({ e2eId, id, body }: PixWebhooksReturnProps): Promise<PixManageReturnResponse | null>;
    /**
     * ---
     *
     * Consultar uma devolução através de um `e2eId` do Pix e do `ID da devolução`.
     *
     * ---
     *
     * ### Instruções
     * É possível consultar informações de uma devolução simulada pelo endpoint de Envio de Devolução no ambiente de homologação.
     *
     * A funcionalidade ocorre exatamente como no ambiente de produção.
     *
     * ---
     *
     * @param PixWebhooksReturnProps
     * @returns `PixManageReturnResponse | null`
     */
    consultReturn({ e2eId, id }: PixWebhooksConsultReturnProps): Promise<PixManageReturnResponse | null>;
    useCredentials({ clientId, clientSecret, }: {
        clientId: string;
        clientSecret: string;
    }): PixManage<type>;
}

interface PixPayloadLocationsCreateProps {
  body: {
    tipoCob: TipoCob
  }
}

interface PixPayloadLocationsFindUniqueProps {
  /**
   *  ID do location a ser associada a cobrança. int32
   */
  id: number
}

interface PixPayloadLocationsFindManyProps
  extends PixFilterSearchProps {}

interface PixPayloadLocationsGenerateQrCodeProps {
  /**
   *  ID do location a ser associada a cobrança. int32
   */
  id: number
}

interface PixPayloadLocationsDetachTxIdProps {
  /**
   *  ID do location a ser associada a cobrança. int32
   */
  id: number
}

interface PixPayloadLocationsResponseType extends PixLocationProps {}

interface PixPayloadLocationsGenerateQrCodeResponseType {
  /**
   * BRCode ou copia e cola
   */
  qrcode: string
  imagemQrcode: string
  linkVisualizacao: string
}

declare class PixPayloadLocationsQRCodeResponse extends ApiResponse {
    #private;
    constructor(props: PixPayloadLocationsGenerateQrCodeResponseType);
    /**
     * BRCode ou copia e cola
     */
    get qrcode(): string;
    get imagemQrcode(): string;
    get linkVisualizacao(): string;
    toObject(): {
        qrcode: string;
        imagemQrcode: string;
        linkVisualizacao: string;
    };
}

declare class PixPayloadLocationsResponse extends PixLocation {
}

declare class PixPayloadLocationsResponseArray extends ApiArrayResponse<typeof PixPayloadLocationsResponse> {
    constructor(props: PixChargeResponseTypeArray<PixPayloadLocationsResponseType, 'loc'>);
    get loc(): PixPayloadLocationsResponse[];
    toObject(): {
        parametros: {
            inicio: Date;
            fim: Date;
            paginaAtual: number;
            itensPorPagina: number;
            quantidadeDePaginas: number;
            quantidadeTotalDeItens: number;
        };
        loc: {
            id: number;
            location: string;
            tipoCob: "cob" | "cobv";
            criacao: Date | undefined;
        }[];
    };
}

/**
 * Destinado a lidar com configuração e remoção de locations para uso dos payloads.
 */
declare class PixPayloadLocations<type extends EnvironmentTypes> extends ApiRequest<type, 'PIX'> {
    /**
     *
     * ---
     *
     * Criar location do payload. Necessário enviar no body da requisição o atributo tipoCob com o valor COB ou COBV.
     *
     * ---
     *
     * @param PixPayloadLocationsCreateProps
     * @returns `PixLocation<"cob" | "cobv" | undefined> | null`
     */
    create({ body }: PixPayloadLocationsCreateProps): Promise<PixPayloadLocationsResponse | null>;
    /**
     *
     * ---
     *
     * Recuperar a location do payload
     *
     * ---
     *
     */
    findUnique({ id }: PixPayloadLocationsFindUniqueProps): Promise<PixPayloadLocationsResponse | null>;
    /**
     *
     * ---
     *
     * Consultar locations cadastradas.
     *
     * ---
     *
     */
    findMany({ searchParams }: PixPayloadLocationsFindManyProps): Promise<PixPayloadLocationsResponseArray | null>;
    /**
     *
     * ---
     *
     * Gerar QR Code de um location.
     *
     * ---
     *
     */
    generateQrCode({ id }: PixPayloadLocationsGenerateQrCodeProps): Promise<PixPayloadLocationsQRCodeResponse | null>;
    /**
     *
     * ---
     *
     * Desvincular uma cobrança de um location.
     *
     * ---
     *
     * Se executado com sucesso, a entidade `loc` não apresentará mais um **txid**, como acontecia antes da chamada. Além disso, a entidade `cob` ou `cobv` associada ao txid desvinculado também não apresentará mais um location. Essa operação não altera o `status` da `cob` ou `cobv` em questão.
     *
     * ---
     *
     */
    detachTxId({ id }: PixPayloadLocationsDetachTxIdProps): Promise<PixPayloadLocationsResponse | null>;
    useCredentials({ clientId, clientSecret, }: {
        clientId: string;
        clientSecret: string;
    }): PixPayloadLocations<type>;
}

/**
 *
 * ---
 *
 * O campo descricao , opcional, determina um texto a ser apresentado na criação da configuração do Split em formato livre. Esse texto será preenchido pelo criador da configuração do Split. O tamanho do campo está limitado a 80 caracteres (string).
 *
 * ---
 *
 * `string`
 */
type Descricao = string

/**
 *
 * ---
 *
 * Define o tipo de repasse, se é porcentagem ou fixo.
 *
 * ---
 *
 * `(string)` Ex: `'porcentagem'` ou `'fixo'`
 *
 */
type Tipo = 'porcentagem' | 'fixo'
/**
 *
 * ---
 *
 * Define o valor que será repassado. Se o tipo for `"porcentagem"`,  representa a porcentagem, caso contrário representará o valor nominal
 *
 * ---
 *
 * `(string)`. Ex: `"60.00"` `(60%)`
 */
type valor = string

type Split = {
  /**
   *
   * ---
   *
   * Define o tipo de repasse, se é porcentagem ou fixo.
   *
   * ---
   *
   * `(string)` Ex: `'porcentagem'` ou `'fixo'`
   *
   */
  tipo: Tipo
  /**
   *
   * ---
   *
   * Define o valor que será repassado. Se o tipo for `"porcentagem"`,  representa a porcentagem, caso contrário representará o valor nominal
   *
   * ---
   *
   * `(string)`. Ex: `"60.00"` `(60%)`
   */
  valor: valor
}

/**
 *
 * ---
 *
 * Define os dados do favorecido.
 *
 * ---
 *
 * (object)
 */
type Favorecido$1 =
  | {
      /**
       * CPF do favorecido.string `/^\d{11}$/`
       */
      cpf: string
      /**
       * CNPJ do favorecido.string `/^\d{14}$/`
       */
      cnpj?: undefined
      /**
       * Número da conta do favorecido (incluindo digito final, sem o hífen).
       */
      conta: string
    }
  | {
      /**
       * CNPJ do favorecido.string `/^\d{14}$/`
       */
      cnpj: string
      /**
       * CPF do favorecido.string `/^\d{11}$/`
       */
      cpf?: undefined
      /**
       * Número da conta do favorecido (incluindo digito final, sem o hífen).
       */
      conta: string
    }

interface PixPaymentSplitCreateProps {
  /**
   *
   * ---
   *
   * O campo id determina o identificador do Split de pagamento.
   *
   * O `id` é criado pela pessoa recebedora e está sob sua responsabilidade. Porém, se não for informado, o `id` será definido pela Efí, fazendo uma exceção à regra padrão.
   *
   * ---
   *
   * `string` (Id do Split) `^[a-zA-Z0-9]{1,35}$`
   */
  id?: string
  body: {
    /**
     *
     * ---
     *
     * O campo descricao , opcional, determina um texto a ser apresentado na criação da configuração do Split em formato livre. Esse texto será preenchido pelo criador da configuração do Split. O tamanho do campo está limitado a 80 caracteres (string).
     *
     * ---
     *
     * `string`
     */
    descricao: Descricao
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
    txid?: TxId$2
    /**
     * `Object (Lancamento)`
     */
    lancamento: {
      /**
       * `(boolean)`
       */
      imediato: boolean
    }
    /**
     * `Object (Split)`
     */
    split: {
      /**
       *
       * ---
       *
       * Maneira a qual a tarifa será cobrada.
       *
       * ---
       *
       * `(string)` Ex: `"assumir_total"` ou `"proporcional"`
       */
      divisaoTarifa: 'assumir_total' | 'proporcional'
      /**
       *
       * ---
       *
       * Define o repasse para a conta do cliente que está configurando o Split.
       *
       * ---
       *
       * `(string)`
       */
      minhaParte: Split
      /**
       * Define os repasses para as contas dos beneficiários que não o cliente configurador do Split
       *
       * ---
       *
       * `(array)`
       */
      repasses: (Split & {
        /**
         *
         * ---
         *
         * Define os dados do favorecido.
         *
         * ---
         *
         * (object)
         */
        favorecido: Favorecido$1
      })[]
    }
  }
}

interface PixPaymentSplitFindUniqueProps {
  /**
   *
   * ---
   *
   * O campo id determina o identificador do Split de pagamento.
   *
   * ---
   *
   * `string` (Id do Split) `^[a-zA-Z0-9]{1,35}$`
   */
  id: string

  searchParams?: {
    /**
     *
     * ---
     *
     * Permite recuperar revisões anteriores da configuração de split. Na ausência desse parâmetro, sempre será retornada a cobrança conforme consta em sua última revisão.
     *
     * ---
     *
     * `Integer($int32)`
     */
    revisao?: number
  }
}

interface PixPaymentSplitAttachImediateChargeProps {
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
  txid: TxId$2
  /**
   * O campo `splitConfigId` determina o identificador do Split de pagamento.
   */
  splitConfigId
}

interface PixPaymentSplitAttachDueChargeProps
  extends PixPaymentSplitAttachImediateChargeProps {}

interface PixPaymentSplitFindUniqueImediateChargeAttachmentProps {
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
  txid: TxId$2
}

interface PixPaymentSplitFindUniqueDueChargeAttachmentProps
  extends PixPaymentSplitFindUniqueImediateChargeAttachmentProps {}

interface PixPaymentSplitFindUniqueImediateChargeAttachmentResponseType
  extends PixImediateChargeResponseCreationProps {
  config: {
    id: string
    status: string
    descricao: string
  }
}

interface PixPaymentSplitFindUniqueDueChargeAttachmentResponseType
  extends PixDueChargeResponseType {
  config: {
    id: string
    status: string
    descricao: string
  }
}

interface PixPaymentSplitDeleteImediateChargeAttachmentProps
  extends PixPaymentSplitFindUniqueImediateChargeAttachmentProps {}

type PixPaymentSplitCreatePropsBody = PixPaymentSplitCreateProps['body']

interface PixPaymentSplitResponseType
  extends PixPaymentSplitCreatePropsBody {
  status: string
  id: string
}

declare class PixPaymentSplitAttachmentResponse extends ApiResponse {
    #private;
    constructor(props: '' | undefined);
    get success(): boolean;
    toObject(): {
        success: boolean;
    };
}

declare class PixPaymentSplitDueChargeAttachmentResponse extends ApiResponse {
    #private;
    constructor({ config, ...dueChargeProps }: PixPaymentSplitFindUniqueDueChargeAttachmentResponseType);
    get calendario(): CalendarDueCharge;
    get txid(): TxId$1;
    get revisao(): number;
    get loc(): PixLocation<"cobv">;
    /**
     * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
     */
    get location(): string;
    get status(): Status$2;
    get devedor(): UserAccount;
    get valor(): PixDueChargeValue;
    get chave(): string;
    get solicitacaoPagador(): string;
    get pixCopiaECola(): string;
    get config(): {
        id: Id;
        status: string;
        descricao: string;
    };
    toObject(props?: {
        valueFormat?: MonetaryValueToObjectProps['formatProps'];
    }): {
        config: {
            id: string;
            status: string;
            descricao: string;
        };
        calendario: {
            criacao: Date;
            dataDeVencimento: Date;
            validadeAposVencimento: number;
        };
        txid: string;
        revisao: number;
        loc: {
            id: number;
            location: string;
            tipoCob: "cobv";
            criacao: Date | undefined;
        };
        location: string;
        status: Status$2;
        devedor: {
            clienteFinal: {
                celular: string | undefined;
                cpf: string | undefined;
                dataNascimento: `${number}/${number}/${number}`;
                email: string | undefined;
                endereco: {
                    bairro: string;
                    cep: string;
                    cidade: string;
                    complemento: string;
                    estado: "AM" | "PA" | "RR" | "AP" | "AC" | "RO" | "TO" | "MA" | "PI" | "CE" | "RN" | "PB" | "PE" | "AL" | "SE" | "BA" | "MG" | "ES" | "RJ" | "SP" | "PR" | "SC" | "RS" | "MS" | "MT" | "GO" | "DF";
                    logradouro: string;
                    numero: string;
                } | undefined;
                nomeCompleto: string;
                nomeMae: string | undefined;
                cnpj: string | undefined;
                razaoSocial: string | undefined;
            };
            escoposIntegrados: ("cob.write" | "cob.read" | "pix.write" | "pix.read" | "webhook.write" | "webhook.read" | "payloadlocation.write" | "payloadlocation.read" | "gn.pix.evp.write" | "gn.pix.evp.read" | "gn.balance.read" | "gn.settings.write" | "gn.settings.read" | "gn.opb.participants.read" | "gn.opb.payment.pix.send" | "gn.opb.payment.pix.read" | "gn.opb.payment.pix.refund" | "gn.opb.payment.pix.cancel" | "gn.opb.config.write" | "gn.opb.config.rea")[] | undefined;
            meioDeNotificacao: ("whatsapp" | "sms")[] | undefined;
        };
        valor: {
            details: {
                multa: {
                    data: {
                        modalidade: 1 | 2;
                        valorPerc: string;
                    };
                    details: {
                        cents: number;
                        units: number;
                        originalValue: string;
                        format: string;
                    };
                };
                juros: {
                    data: {
                        modalidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
                        valorPerc: string;
                    };
                    details: {
                        modalidade: {
                            type: "dias corridos" | "dias úteis";
                            interest: "Percentual" | "Valor";
                            periodicity: "dia" | "mês" | "ano";
                            format: `${string} ao dia (dias corridos)` | `${string} ao dia (dias \u00FAteis)` | `${string} ao m\u00EAs (dias corridos)` | `${string} ao m\u00EAs (dias \u00FAteis)` | `${string} ao ano (dias corridos)` | `${string} ao ano (dias \u00FAteis)`;
                        };
                        value: string;
                    };
                };
                abatimento: {
                    data: {
                        modalidade: 1 | 2;
                        valorPerc: string;
                    } | undefined;
                    details: {
                        modalidade: {
                            type: "Valor Fixo" | "Valor Percentual";
                        } | undefined;
                        value: string | undefined;
                    };
                };
                desconto: {
                    data: {
                        modalidade: 1 | 2;
                        valorPerc: string;
                    } | undefined;
                    details: {
                        modalidade: {
                            type: "por antecipação dias corridos" | "por antecipação dias úteis" | "fixo";
                            interest: "Percentual" | "Valor";
                        };
                        value: {
                            data: `${string}-${string}-${string}`;
                            value: string;
                        }[];
                    };
                };
            };
            value: string;
        };
        chave: string;
        solicitacaoPagador: string;
        pixCopiaECola: string;
    };
}

declare class PixPaymentSplitImediateChargeAttachmentResponse extends ApiResponse {
    #private;
    constructor({ config, ...imediateChargeProps }: PixPaymentSplitFindUniqueImediateChargeAttachmentResponseType);
    get calendario(): CalendarImediateCharge;
    get txid(): TxId$1;
    get revisao(): number;
    get loc(): PixLocation<"cob">;
    /**
     * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
     */
    get location(): string;
    get status(): Status$2;
    get devedor(): UserAccount;
    get valor(): MonetaryValue;
    get chave(): string;
    get solicitacaoPagador(): string;
    get pixCopiaECola(): string;
    get config(): {
        id: Id;
        status: string;
        descricao: string;
    };
    toObject(props?: {
        valueFormat?: MonetaryValueToObjectProps['formatProps'];
    }): {
        config: {
            id: string;
            status: string;
            descricao: string;
        };
        calendario: {
            criacao: Date;
            expiracao: number;
        };
        txid: string;
        revisao: number;
        loc: {
            id: number;
            location: string;
            tipoCob: "cob";
            criacao: Date | undefined;
        };
        location: string;
        status: Status$2;
        devedor: {
            clienteFinal: {
                celular: string | undefined;
                cpf: string | undefined;
                dataNascimento: `${number}/${number}/${number}`;
                email: string | undefined;
                endereco: {
                    bairro: string;
                    cep: string;
                    cidade: string;
                    complemento: string;
                    estado: "AM" | "PA" | "RR" | "AP" | "AC" | "RO" | "TO" | "MA" | "PI" | "CE" | "RN" | "PB" | "PE" | "AL" | "SE" | "BA" | "MG" | "ES" | "RJ" | "SP" | "PR" | "SC" | "RS" | "MS" | "MT" | "GO" | "DF";
                    logradouro: string;
                    numero: string;
                } | undefined;
                nomeCompleto: string;
                nomeMae: string | undefined;
                cnpj: string | undefined;
                razaoSocial: string | undefined;
            };
            escoposIntegrados: ("cob.write" | "cob.read" | "pix.write" | "pix.read" | "webhook.write" | "webhook.read" | "payloadlocation.write" | "payloadlocation.read" | "gn.pix.evp.write" | "gn.pix.evp.read" | "gn.balance.read" | "gn.settings.write" | "gn.settings.read" | "gn.opb.participants.read" | "gn.opb.payment.pix.send" | "gn.opb.payment.pix.read" | "gn.opb.payment.pix.refund" | "gn.opb.payment.pix.cancel" | "gn.opb.config.write" | "gn.opb.config.rea")[] | undefined;
            meioDeNotificacao: ("whatsapp" | "sms")[] | undefined;
        };
        valor: {
            cents: number;
            units: number;
            originalValue: string;
            format: string;
        };
        chave: string;
        solicitacaoPagador: string;
        pixCopiaECola: string;
    };
}

type ResponseSplit = {
    /**
     *
     * ---
     *
     * Define o tipo de repasse, se é porcentagem ou fixo.
     *
     * ---
     *
     * `(string)` Ex: `'porcentagem'` ou `'fixo'`
     *
     */
    tipo: Tipo;
    /**
     *
     * ---
     *
     * Define o valor que será repassado. Se o tipo for `"porcentagem"`,  representa a porcentagem, caso contrário representará o valor nominal
     *
     * ---
     *
     * `(string)`. Ex: `"60.00"` `(60%)`
     */
    valor: string;
};
type ResponseFavorecido = {
    /**
     * CPF do favorecido.string `/^\d{11}$/`
     */
    cpf: Cpf;
    /**
     * CNPJ do favorecido.string `/^\d{14}$/`
     */
    cnpj?: undefined;
    /**
     * Número da conta do favorecido (incluindo digito final, sem o hífen).
     */
    conta: string;
} | {
    /**
     * CNPJ do favorecido.string `/^\d{14}$/`
     */
    cnpj: Cnpj;
    /**
     * CPF do favorecido.string `/^\d{11}$/`
     */
    cpf?: undefined;
    /**
     * Número da conta do favorecido (incluindo digito final, sem o hífen).
     */
    conta: string;
};
declare class PixPaymentSplitResponse extends ApiResponse {
    #private;
    constructor(props: PixPaymentSplitResponseType);
    get id(): Id;
    /**
     *
     * ---
     *
     * O campo descricao , opcional, determina um texto a ser apresentado na criação da configuração do Split em formato livre. Esse texto será preenchido pelo criador da configuração do Split. O tamanho do campo está limitado a 80 caracteres (string).
     *
     * ---
     *
     * `string`
     */
    get descricao(): string;
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
    get txid(): TxId$1 | undefined;
    /**
     * `Object (Lancamento)`
     */
    get lancamento(): {
        imediato: boolean;
    };
    /**
     * `Object (Split)`
     */
    get split(): {
        /**
         *
         * ---
         *
         * Maneira a qual a tarifa será cobrada.
         *
         * ---
         *
         * `(string)` Ex: `"assumir_total"` ou `"proporcional"`
         */
        divisaoTarifa: "assumir_total" | "proporcional";
        /**
         *
         * ---
         *
         * Define o repasse para a conta do cliente que está configurando o Split.
         *
         * ---
         *
         * `(string)`
         */
        minhaParte: ResponseSplit;
        repasses: (ResponseSplit & {
            favorecido: ResponseFavorecido;
        })[];
    };
    toObject(): {
        id: Id;
        descricao: string;
        txid: TxId$1 | undefined;
        lancamento: {
            imediato: boolean;
        };
        split: {
            divisaoTarifa: "assumir_total" | "proporcional";
            minhaParte: {
                tipo: Tipo;
                valor: string;
            };
            repasses: {
                tipo: Tipo;
                valor: string;
                favorecido: {
                    cpf: Cpf;
                    conta: string;
                    cnpj?: undefined;
                } | {
                    cnpj: string;
                    conta: string;
                    cpf?: undefined;
                };
            }[];
        };
    };
}

/**
 *
 * ---
 *
 * Realização do Split de pagamento na API Pix Efí. Responsável pela configuração dos Splits de pagamento na API Pix. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
 *
 * ---
 *
 * ### Importante!
 *
 * O **Split de pagamento Pix** só pode ser realizado entre contas Efí, com limite máximo de 20 contas para o repasse.
 *
 * ---
 *
 * ### Informação
 *
 * Uma mesma configuração de Split pode ser utilizada em várias cobranças. Isso significa que você pode definir uma divisão de valores para um parceiro e aplicá-la em todas as cobranças relacionadas.
 *
 * ---
 *
 * ### Configure Split de Pagamento em QR Code e copia e cola estático!
 *
 * Você tem a flexibilidade de dividir o pagamento dos QR Codes e copia e cola estático entre diferentes contas Efí. Isso significa que, ao gerar um QR Code ou um código copia e cola estáticos para pagamento, você pode especificar como o valor recebido será distribuído, facilitando a gestão financeira e assegurando que os fundos sejam alocados corretamente desde o início.
 *
 * ---
 *
 * ### Instruções para testes em Homologação
 *
 * No processo de split de pagamento, é essencial fornecer uma conta digital EFÍ válida.
 *
 * É importante destacar que não é possível realizar o split para a própria conta. Portanto, se estiver realizando testes em ambiente de homologação e não possuir uma conta válida para os repasses, será necessário criar uma subconta. Veja como fazer isso [aqui](https://sejaefi.com.br/central-de-ajuda/efi-bank/ter-mais-de-uma-conta-efi#conteudo).
 *
 * ---
 *
 */
declare class PixPaymentSplit<type extends EnvironmentTypes> extends ApiRequest<type, 'PIX'> {
    /**
     *
     * ---
     *
     * Cadastrar uma cobrança com um identificador de transação (`id`). O id é criado pela pessoa usuária recebedora e está sob sua responsabilidade. Caso o usuário informe um id que já exista, esse endpoint irá atualizar a configuração da cobrança.
     *
     * ---
     *
     * ### Caso `id` não seja informado
     *
     * Em geral, o `id` é criado pela pessoa recebedora e está sob sua responsabilidade. Porém, neste caso, o id será definido pela Efí, fazendo uma exceção à regra padrão.
     *
     * ---
     *
     * @param PixPaymentSplitCreateProps
     * @returns `PixPaymentSplitResponse | null`
     *
     */
    create({ body, id }: PixPaymentSplitCreateProps): Promise<PixPaymentSplitResponse | null>;
    /**
     *
     * ---
     *
     * Consultar um Split de pagamento partir do id.
     *
     * ---
     *
     * @param PixPaymentSplitFindUniqueProps
     * @returns `PixPaymentSplitResponse | null`
     */
    findUnique({ id, searchParams }: PixPaymentSplitFindUniqueProps): Promise<PixPaymentSplitResponse | null>;
    /**
     *
     * ---
     *
     * Vincula uma cobrança Pix a um Split de pagamento. Ele utiliza dois campos (`txid` da cobrança e splitConfigId do Split de pagamento) para fazer essa vinculação quando a cobrança Pix está ativa.
     *
     * ---
     *
     */
    attachImediateCharge({ txid, splitConfigId, }: PixPaymentSplitAttachImediateChargeProps): Promise<PixPaymentSplitAttachmentResponse | null>;
    /**
     *
     * ---
     *
     * Consultar uma cobrança com Split de pagamento a partir do `txid`.
     *
     * ---
     *
     * @param PixPaymentSplitFindUniqueImediateChargeAttachmentProps
     * @returns `PixPaymentSplitImediateChargeAttachmentResponse | null`
     */
    findUniqueImediateChargeAttachment({ txid, }: PixPaymentSplitFindUniqueImediateChargeAttachmentProps): Promise<PixPaymentSplitImediateChargeAttachmentResponse | null>;
    /**
     *
     * ---
     *
     * Deletar o vinculo entre um split de pagamento e uma cobrança a partir do `txid`.
     *
     * ---
     *
     * @param PixPaymentSplitDeleteImediateChargeAttachmentProps
     * @returns `PixPaymentSplitAttachmentResponse | null`
     */
    deleteImediateChargeAttachment({ txid, }: PixPaymentSplitDeleteImediateChargeAttachmentProps): Promise<PixPaymentSplitAttachmentResponse | null>;
    /**
     *
     * ---
     *
     * Vincula uma cobrança com vencimento (COBV) a um Split de pagamento.
     *
     * ---
     *
     */
    attachDueCharge({ txid, splitConfigId, }: PixPaymentSplitAttachDueChargeProps): Promise<PixPaymentSplitAttachmentResponse | null>;
    /**
     *
     * ---
     *
     * Consultar  uma cobrança com vencimento e com a partir do `txid`.
     *
     * ---
     *
     * @param PixPaymentSplitFindUniqueImediateChargeAttachmentProps
     * @returns `PixPaymentSplitImediateChargeAttachmentResponse | null`
     */
    findUniqueDueChargeAttachment({ txid, }: PixPaymentSplitFindUniqueDueChargeAttachmentProps): Promise<PixPaymentSplitDueChargeAttachmentResponse | null>;
    /**
     *
     * ---
     *
     * Deletar o vinculo entre um split de pagamento e uma cobrança com vencimento a partir do `txid`.
     *
     * ---
     *
     * @param PixPaymentSplitDeleteImediateChargeAttachmentProps
     * @returns `PixPaymentSplitAttachmentResponse | null`
     */
    deleteDueChargeAttachment({ txid, }: PixPaymentSplitDeleteImediateChargeAttachmentProps): Promise<PixPaymentSplitAttachmentResponse | null>;
    useCredentials({ clientId, clientSecret, }: {
        clientId: string;
        clientSecret: string;
    }): PixPaymentSplit<type>;
}

/**
 * O campo idEnvio determina o identificador da transação. `string \d{1,10}\.\d{2}`
 */
type IdEnvio$1 = string

/**
 * Valores monetários referentes à cobrança.
 *
 * string `\d{1,10}\.\d{2}`
 */
type Valor = string

/**
 * O campo pagador contém a chave Pix associada a conta autenticada que será debitado o valor definido.
 */
type Pagador = {
  /**
   * O campo chave determina a chave Pix registrada no DICT que será utilizada identificar o pagador do Pix. string (Chave DICT do pagador) `≤ 77 characters`
   */
  chave: string
  /**
   * Informação do pagador sobre o Pix a ser enviado. `string < 140`
   */
  infoPagador?: string
}

/**
 * O campo favorecido contém a chave Pix ou os dados bancários que será creditado o valor definido.
 */
type Favorecido =
  | {
      /**
       * O campo chave determina a chave Pix registrada no DICT que será utilizada identificar o recebedor do Pix. string (Chave DICT do recebedor) `≤ 77 characters`
       */
      chave: string
      /**
       * O campo cpf valida se a chave Pix registrada no DICT pertence ao titular do documento informado
       */
      cpf?: string
      /**
       * O campo cnpj valida se a chave Pix registrada no DICT pertence ao titular do documento informado
       */
      cnpj?: string
    }
  | {
      contaBanco:
        | {
            /**
             * Nome do recebedor (string) `< 200 characters`
             */
            nome: string
            /**
             * CPF do recebedor (string) `^[0-9]{11}$`
             */
            cpf: string
            /**
             *  [ISPB do Banco do recebedor](https://www.bcb.gov.br/content/estabilidadefinanceira/str1/ParticipantesSTR.pdf) (string) `^[0-9]{8}$`
             */
            codigoBanco: string
            /**
             * Agência do recebedor no seu Banco, sem o dígito verificador (string) `^[0-9]{1,4}$`
             */
            agencia: string
            /**
             * Conta do recebedor no seu Banco com o dígito verificador, sem traço - (string) `^[0-9]+`
             */
            conta: string
            /**
             * Tipo da conta do recebedor no seu Banco, podendo ser: `cacc` (Conta corrente) ou `svgs` (poupança)
             */
            tipoConta: 'cacc' | 'svgs'
          }
        | {
            /**
             * Nome do recebedor (string) `< 200 characters`
             */
            nome: string
            /**
             * CNPJ do recebedor (string) ^[0-9]{14}$
             */
            cnpj: string
            /**
             *  [ISPB do Banco do recebedor](https://www.bcb.gov.br/content/estabilidadefinanceira/str1/ParticipantesSTR.pdf) (string) `^[0-9]{8}$`
             */
            codigoBanco: string
            /**
             * Agência do recebedor no seu Banco, sem o dígito verificador (string) `^[0-9]{1,4}$`
             */
            agencia: string
            /**
             * Conta do recebedor no seu Banco com o dígito verificador, sem traço - (string) `^[0-9]+`
             */
            conta: string
            /**
             * Tipo da conta do recebedor no seu Banco, podendo ser: `cacc` (Conta corrente) ou `svgs` (poupança)
             */
            tipoConta: 'cacc' | 'svgs'
          }
    }

interface PixSendAndPaymentSendProps {
  /**
   * O campo idEnvio determina o identificador da transação. `string \d{1,10}\.\d{2}`
   */
  idEnvio: IdEnvio$1
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

interface PixSendAndPaymentSendResponseType {
  /**
   * O campo idEnvio determina o identificador da transação. `string \d{1,10}\.\d{2}`
   */
  idEnvio: IdEnvio$1
  /**
   * EndToEndIdentification que transita na PACS002, PACS004 e PACS008. `32 characters` `^[a-zA-Z0-9]{32}`
   */
  e2eId: E2eId$1
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
  status: PixStatus
}

declare class PixSendAndPaymentSendResponse extends ApiResponse {
    #private;
    constructor(props: PixSendAndPaymentSendResponseType);
    get props(): PixSendAndPaymentSendResponseType;
    toObject(...props: unknown[]): unknown;
}

/**
 *  Traz as funcionalidades disponíveis para a gestão do Envio de Pix e do Pagamento de QR Codes Pix
 */
declare class PixSendAndPayment<type extends EnvironmentTypes> extends ApiRequest<type, 'PIX'> {
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
    send({ body, idEnvio }: PixSendAndPaymentSendProps): Promise<PixSendAndPaymentSendResponse | null>;
    useCredentials({ clientId, clientSecret, }: {
        clientId: string;
        clientSecret: string;
    }): PixSendAndPayment<type>;
}

/**
 * Url para onde a notificação vai ser enviada
 */
type WebhookUrl = string;
/**
 * Horário em que o webhook foi criado.
 *
 * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
 */
type Criacao = string;

interface PixWebhooksAddProps {
    /**
     * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
     *
     * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
     *
     * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
     *
     * - string (Chave DICT do recebedor) `≤ 77 characters`
     */
    chave: Chave;
    body: {
        /**
         * Url para onde a notificação vai ser enviada
         */
        webhookUrl: WebhookUrl;
    };
}
interface PixWebhooksFindUniqueProps {
    /**
     * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
     *
     * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
     *
     * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
     *
     * - string (Chave DICT do recebedor) `≤ 77 characters`
     */
    chave: Chave;
}
interface PixWebhooksFindManyProps extends PixFilterSearchProps {
}
interface PixWebhooksDeleteProps {
    /**
     * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
     *
     * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
     *
     * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
     *
     * - string (Chave DICT do recebedor) `≤ 77 characters`
     */
    chave: Chave;
}
interface PixWebhooksResponseType {
    /**
     * Url para onde a notificação vai ser enviada
     */
    webhookUrl: string;
    /**
     * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
     *
     * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
     *
     * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
     *
     * - string (Chave DICT do recebedor) `≤ 77 characters`
     */
    chave: Chave;
    /**
     * Horário em que o webhook foi criado.
     *
     * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
     */
    criacao: Criacao;
}

type PixWebhooksAddResponseType = {
    webhookUrl: string;
};
declare class PixWebhooksAddResponse extends ApiResponse {
    #private;
    constructor(props: PixWebhooksAddResponseType);
    /**
     * Url para onde a notificação vai ser enviada
     */
    get webhookUrl(): string;
    toObject(): {
        /**
         * Url para onde a notificação vai ser enviada
         */
        webhookUrl: string;
    };
}

type PixWebhooksDeleteResponseType = Record<string, string>;
declare class PixWebhooksDeleteResponse extends ApiResponse {
    #private;
    constructor(props: PixWebhooksDeleteResponseType);
    get props(): PixWebhooksDeleteResponseType;
    get status(): string;
    toObject(): {
        status: string;
    };
}

declare class PixWebhooksResponse extends ApiResponse {
    #private;
    constructor(props: PixWebhooksResponseType);
    /**
     * Url para onde a notificação vai ser enviada
     */
    get webhookUrl(): string;
    /**
     * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
     *
     * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
     *
     * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
     *
     * - string (Chave DICT do recebedor) `≤ 77 characters`
     */
    get chave(): string;
    /**
     * Horário em que o webhook foi criado.
     *
     * @return instância do `dayjs`
     */
    get criacao(): dayjs.Dayjs;
    toObject(): {
        /**
         * Url para onde a notificação vai ser enviada
         */
        webhookUrl: string;
        /**
         * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
         *
         * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
         *
         * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
         *
         * - string (Chave DICT do recebedor) `≤ 77 characters`
         */
        chave: string;
        /**
         * Horário em que o webhook foi criado.
         *
         * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
         */
        criacao: Date;
    };
}

declare class PixWebhooksResponseArray extends ApiArrayResponse<typeof PixWebhooksResponse> {
    constructor(props: PixChargeResponseTypeArray<PixWebhooksResponseType, 'webhooks'>);
    get webhooks(): PixWebhooksResponse[];
    toObject(): {
        parametros: {
            inicio: Date;
            fim: Date;
            paginaAtual: number;
            itensPorPagina: number;
            quantidadeDePaginas: number;
            quantidadeTotalDeItens: number;
        };
        webhooks: {
            webhookUrl: string;
            chave: string;
            criacao: Date;
        }[];
    };
}

/**
 * gerenciamento de notificações por parte do PSP recebedor a pessoa usuária recebedora.
 */
declare class PixWebhooks<type extends EnvironmentTypes> extends ApiRequest<type, 'PIX'> {
    /**
     * Configuração do serviço de notificações acerca de Pix recebidos. Pix oriundos de cobranças estáticas só serão notificados se estiverem associados a um txid.
     *
     * ---
     *
     * - ### Lembrete
     * Uma URL de webhook pode estar associada a várias chaves Pix. **Por outro lado, uma chave Pix só pode estar vinculada a uma única URL de webhook**.
     *
     * ---
     *
     * - ### Informação
     * Ao cadastrar seu webhook, enviaremos uma notificação de teste para a URL cadastrada, porém quando de fato uma notificação for enviada, o caminho `/pix` será acrescentado ao final da URL cadastrada. Para não precisar de duas rotas distintas, você poder adicionar um parâmetro `?ignorar=` ao final da URL cadastrada, para que o `/pix` não seja acrescentado na rota da sua URL.
     *
     */
    add({ body, chave }: PixWebhooksAddProps): Promise<PixWebhooksAddResponse | null>;
    findUnique({ chave }: PixWebhooksFindUniqueProps): Promise<PixWebhooksResponse | null>;
    findMany({ searchParams }: PixWebhooksFindManyProps): Promise<PixWebhooksResponseArray | null>;
    delete({ chave }: PixWebhooksDeleteProps): Promise<PixWebhooksDeleteResponse | null>;
    useCredentials({ clientId, clientSecret, }: {
        clientId: string;
        clientSecret: string;
    }): PixWebhooks<type>;
}

interface PixRequestProps<type extends EnvironmentTypes> {
    type: type;
    options: Optional<EfiConfig<type, 'PIX'>, 'sandbox' | 'certificateType'>;
}
/**
 * A API Pix Efí oferece recursos avançados para integração com sua aplicação, permitindo que você crie soluções personalizadas e ofereça opções de pagamento inovadoras aos seus clientes. Com nossa API é possível criar cobranças, verificar os Pix recebidos, devolver e enviar Pix.
 *
 * Para integrar a API Pix Efí ao seu sistema ou sua plataforma, é necessário ter uma Conta Digital Efí. Uma vez com acesso, você poderá obter as credenciais e o certificado necessários para a comunicação com a API Pix Efí.
 *
 * [Condira a Documentação oficial para mais detalhes](https://dev.efipay.com.br/docs/api-pix/credenciais)
 */
declare class PixRequest<type extends EnvironmentTypes> extends ApiRequest<type, 'PIX'> {
    #private;
    constructor({ type, options }: PixRequestProps<type>);
    /**
     * Responsável pela gestão de cobranças imediatas. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
     */
    get imediateCharge(): PixImediateCharge<type>;
    /**
     * responsável pela gestão de cobranças imediatas. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
     */
    get dueCharge(): PixDueCharge<type>;
    /**
     *  Traz as funcionalidades disponíveis para a gestão do Envio de Pix e do Pagamento de QR Codes Pix
     */
    get sendAndPayment(): PixSendAndPayment<type>;
    /**
     * gerenciamento de notificações por parte do PSP recebedor a pessoa usuária recebedora.
     */
    get webhooks(): PixWebhooks<type>;
    /**
     * Gestão das transações Pix, isto é, a manutenção dos recebimentos e devoluções Pix.
     */
    get manage(): PixManage<type>;
    /**
     * Destinado a lidar com configuração e remoção de locations para uso dos payloads.
     */
    get payloadLocations(): PixPayloadLocations<type>;
    /**
     * Responsável pela gestão de cobranças em lote. As cobranças, no contexto da API Pix, representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
     */
    get batchCollections(): PixBatchCollections<type>;
    /**
     *
     * ---
     *
     * Realização do Split de pagamento na API Pix Efí. Responsável pela configuração dos Splits de pagamento na API Pix. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
     *
     * ---
     *
     * ### Importante!
     *
     * O **Split de pagamento Pix** só pode ser realizado entre contas Efí, com limite máximo de 20 contas para o repasse.
     *
     * ---
     *
     * ### Informação
     *
     * Uma mesma configuração de Split pode ser utilizada em várias cobranças. Isso significa que você pode definir uma divisão de valores para um parceiro e aplicá-la em todas as cobranças relacionadas.
     *
     * ---
     *
     * ### Configure Split de Pagamento em QR Code e copia e cola estático!
     *
     * Você tem a flexibilidade de dividir o pagamento dos QR Codes e copia e cola estático entre diferentes contas Efí. Isso significa que, ao gerar um QR Code ou um código copia e cola estáticos para pagamento, você pode especificar como o valor recebido será distribuído, facilitando a gestão financeira e assegurando que os fundos sejam alocados corretamente desde o início.
     *
     * ---
     *
     * ### Instruções para testes em Homologação
     *
     * No processo de split de pagamento, é essencial fornecer uma conta digital EFÍ válida.
     *
     * É importante destacar que não é possível realizar o split para a própria conta. Portanto, se estiver realizando testes em ambiente de homologação e não possuir uma conta válida para os repasses, será necessário criar uma subconta. Veja como fazer isso [aqui](https://sejaefi.com.br/central-de-ajuda/efi-bank/ter-mais-de-uma-conta-efi#conteudo).
     *
     * ---
     *
     */
    get paymentSplit(): PixPaymentSplit<type>;
    useCredentials({ clientId, clientSecret, }: {
        clientId: string;
        clientSecret: string;
    }): PixRequest<type>;
}

declare class PixManageResponseArray extends ApiArrayResponse<typeof PixManageResponse> {
    constructor(props: PixChargeResponseTypeArray<PixManageResponseType, 'pix'>);
    get pix(): PixManageResponse[];
    toObject(): {
        parametros: {
            inicio: Date;
            fim: Date;
            paginaAtual: number;
            itensPorPagina: number;
            quantidadeDePaginas: number;
            quantidadeTotalDeItens: number;
        };
        pix: {
            endToEndId: string;
            txid: string;
            valor: {
                cents: number;
                units: number;
                originalValue: string;
                format: string;
            };
            horario: Date;
            infoPagador: string;
            devolucoes: {
                id: string;
                rtrId: string;
                valor: {
                    cents: number;
                    units: number;
                    originalValue: string;
                    format: string;
                };
                horario: {
                    solicitacao: Date;
                };
                status: PixStatus;
            }[] | undefined;
        }[];
    };
}

/**
 * Determina o identificador da transação.
 *
 * - string (Id da Transação) `^[a-zA-Z0-9]{1,35}$`
 */
declare class IdEnvio extends Id {
    constructor(id?: string);
    generate(): string;
}

type OptionsCredentials = {
    client_id?: string;
    client_secret?: string;
    certificate?: PathLike;
    certificateType?: CertificateType;
    validateMtls?: boolean;
};
type GenerateDotEnvProps = {
    variables?: {
        CERTIFICADO_HOMOLOGACAO_PATH?: string;
        CERTIFICADO_PRODUCAO_PATH?: string;
        CERTIFICADO_HOMOLOGACAO_BASE64?: string;
        CERTIFICADO_PRODUCAO_BASE64?: string;
        CLIENT_ID_HOMOLOGACAO?: string;
        CLIENT_SECRET_HOMOLOGACAO?: string;
        CLIENT_ID_PRODUCAO?: string;
        CLIENT_SECRET_PRODUCAO?: string;
        PIX_KEY?: string;
        WEBHOOK_PIX?: string;
    };
    mode?: 'append' | 'overwrite';
};
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
    certificadoHomologacaoBuffer?: Buffer;
    /**
     *
     * ---
     *
     * Certificado de Produção em formato `Buffer`.
     *
     * ---
     *
     */
    certificadoProducaoBuffer?: Buffer;
};
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
    certificadoHomologacaoPath?: string;
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
    certificadoProducaoPath?: string;
};
declare class EfiPay<type extends EnvironmentTypes> {
    #private;
    constructor(type: type, options?: OptionsCredentials);
    /**
     * A API Pix Efí oferece recursos avançados para integração com sua aplicação, permitindo que você crie soluções personalizadas e ofereça opções de pagamento inovadoras aos seus clientes. Com nossa API é possível criar cobranças, verificar os Pix recebidos, devolver e enviar Pix.
     *
     * Para integrar a API Pix Efí ao seu sistema ou sua plataforma, é necessário ter uma Conta Digital Efí. Uma vez com acesso, você poderá obter as credenciais e o certificado necessários para a comunicação com a API Pix Efí.
     *
     * [Confira a Documentação oficial para mais detalhes](https://dev.efipay.com.br/docs/api-pix/credenciais)
     */
    get pix(): PixRequest<type>;
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
    static generateDotEnv(props?: GenerateDotEnvProps): void;
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
    static generateBase64FromCertificate({ certificadoHomologacaoPath, certificadoProducaoPath, }: GenerateBase64FromCertificateProps): void;
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
    static generateBase64FromBufferCertificate({ certificadoHomologacaoBuffer, certificadoProducaoBuffer, }: CertificateFromBufferProps): void;
}

export { Address, CalendarDueCharge, CalendarImediateCharge, Cep, Cnpj, Cpf, E2eId, Email, Id, IdEnvio, MonetaryValue, PixBatchCollections, type PixBatchCollectionsBatchResponseType, type PixBatchCollectionsCreateOrUpdateDueChargeBatchProps, PixBatchCollectionsCreateOrUpdateDueChargeResponse, type PixBatchCollectionsFindManyDueChargeBatchProps, type PixBatchCollectionsFindUniqueDueChargeBatchProps, PixBatchCollectionsResponse, PixBatchCollectionsResponseArray, type PixBatchCollectionsUpdateDueChargeBatchProps, PixDueCharge, type PixDueChargeCreateProps, type PixDueChargeFindManyProps, type PixDueChargeFindUniqueProps, PixDueChargeResponse, PixDueChargeResponseArray, type PixDueChargeUpdateProps, type PixFilterSearchParamsProps, type PixFilterSearchProps, type PixFilterSearchRawParamsProps, type PixFilterSearchRawProps, PixImediateCharge, type PixImediateChargeCreateProps, type PixImediateChargeFindManyProps, type PixImediateChargeFindUniqueProps, PixImediateChargeResponse, PixImediateChargeResponseArray, type PixImediateChargeResponseType, type PixImediateChargeUpdateProps, PixLocation, PixManage, PixManageResponse, PixManageResponseArray, type PixManageResponseType, PixManageReturnResponse, type PixManageReturnResponseType, PixPayloadLocations, type PixPayloadLocationsCreateProps, type PixPayloadLocationsDetachTxIdProps, type PixPayloadLocationsFindManyProps, type PixPayloadLocationsFindUniqueProps, type PixPayloadLocationsGenerateQrCodeProps, type PixPayloadLocationsGenerateQrCodeResponseType, PixPayloadLocationsQRCodeResponse, PixPayloadLocationsResponse, PixPayloadLocationsResponseArray, type PixPayloadLocationsResponseType, PixPaymentSplit, type PixPaymentSplitAttachDueChargeProps, type PixPaymentSplitAttachImediateChargeProps, PixPaymentSplitAttachmentResponse, type PixPaymentSplitCreateProps, type PixPaymentSplitDeleteImediateChargeAttachmentProps, PixPaymentSplitDueChargeAttachmentResponse, type PixPaymentSplitFindUniqueDueChargeAttachmentProps, type PixPaymentSplitFindUniqueDueChargeAttachmentResponseType, type PixPaymentSplitFindUniqueImediateChargeAttachmentResponseType, type PixPaymentSplitFindUniqueProps, PixPaymentSplitImediateChargeAttachmentResponse, PixPaymentSplitResponse, type PixPaymentSplitResponseType, PixRequest, PixSendAndPayment, type PixSendAndPaymentSendProps, PixSendAndPaymentSendResponse, type PixSendAndPaymentSendResponseType, PixWebhooks, type PixWebhooksAddProps, PixWebhooksAddResponse, type PixWebhooksConsultManyProps, type PixWebhooksConsultReturnProps, type PixWebhooksDeleteProps, PixWebhooksDeleteResponse, type PixWebhooksFindManyProps, type PixWebhooksFindUniqueProps, PixWebhooksResponse, PixWebhooksResponseArray, type PixWebhooksResponseType, type PixWebhooksReturnProps, State, TxId$1 as TxId, UserAccount, EfiPay as default };
