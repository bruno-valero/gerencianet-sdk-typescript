import 'dotenv/config'

import z from 'zod'

const envSchema = z.object({
  // CERTIFICATES
  CERTIFICADO_HOMOLOGACAO_PATH: z.string(),
  CERTIFICADO_PRODUCAO_PATH: z.string(),
  // CREDENTIALS
  CLIENT_ID_HOMOLOGACAO: z.string(),
  CLIENT_SECRET_HOMOLOGACAO: z.string(),
  CLIENT_ID_PRODUCAO: z.string(),
  CLIENT_SECRET_PRODUCAO: z.string(),
  PIX_RAMDOM_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
