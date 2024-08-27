import 'dotenv/config'

import z from 'zod'

const envSchema = z.object({
  // CERTIFICATES
  CERTIFICADO_HOMOLOGACAO_PATH: z
    .string()
    // .min(1, 'environment variable "CERTIFICADO_HOMOLOGACAO_PATH" is missing')
    .optional(),
  CERTIFICADO_PRODUCAO_PATH: z
    .string()
    // .min(1, 'environment variable "CERTIFICADO_PRODUCAO_PATH" is missing')
    .optional(),
  CERTIFICADO_HOMOLOGACAO_BASE64: z
    .string()
    // .min(1, 'environment variable "CERTIFICADO_HOMOLOGACAO_BASE64" is missing')
    .optional(),
  CERTIFICADO_PRODUCAO_BASE64: z
    .string()
    // .min(1, 'environment variable "CERTIFICADO_PRODUCAO_BASE64" is missing')
    .optional(),
  // CREDENTIALS
  CLIENT_ID_HOMOLOGACAO: z
    .string()
    // .min(1, 'environment variable "CLIENT_ID_HOMOLOGACAO" is missing')
    .optional(),
  CLIENT_SECRET_HOMOLOGACAO: z
    .string()
    // .min(1, 'environment variable "CLIENT_SECRET_HOMOLOGACAO" is missing')
    .optional(),
  CLIENT_ID_PRODUCAO: z
    .string()
    // .min(1, 'environment variable "CLIENT_ID_PRODUCAO" is missing')
    .optional(),
  CLIENT_SECRET_PRODUCAO: z
    .string()
    .min(1, 'environment variable "CLIENT_SECRET_PRODUCAO" is missing'),
  PIX_KEY: z
    .string()
    // .min(1, 'environment variable "PIX_KEY" is missing')
    .optional(),
  WEBHOOK_PIX: z
    .string()
    // .min(1, 'environment variable "WEBHOOK_PIX" is missing')
    .optional(),
  ACCOUNT_IDENTIFIER: z
    .string()
    // .min(1, 'environment variable "ACCOUNT_IDENTIFIER" is missing')
    .optional(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success)
  throw new Error(
    `Environment variables error. Make sure that you have been created a  ".env" file at the root of your project.
    
    Also make sure that all environment variables have been set. See the documentation to learn about the environment variables that is required at "https://www.npmjs.com/package/@bruno-valero/gerencianet-sdk-typescript?activeTab=readme"

    Error details:

    ${JSON.stringify(_env.error.format(), null, 2)}
    `,
  )

export const env = _env.data
