import { PixRequest } from './domain-driven-design/domains/apis/enterprise/entities/pix/pix'

const EfiPay = {
  pix: PixRequest,
} as const

export default EfiPay
