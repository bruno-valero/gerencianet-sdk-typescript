import type {
  PixFilterSearchParamsProps,
  PixFilterSearchProps,
  PixFilterSearchRawParamsProps,
  PixFilterSearchRawProps,
} from './domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/@interfaces-common'
import {
  PixBatchCollectionsBatchResponseType,
  PixBatchCollectionsCreateOrUpdateDueChargeBatchProps,
  PixBatchCollectionsFindManyDueChargeBatchProps,
  PixBatchCollectionsFindUniqueDueChargeBatchProps,
  PixBatchCollectionsUpdateDueChargeBatchProps,
} from './domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-batch-collections/@interfaces-pix-batch-collections'
import {
  PixDueChargeCreateProps,
  PixDueChargeFindManyProps,
  PixDueChargeFindUniqueProps,
  PixDueChargeUpdateProps,
} from './domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/@interfaces-pix-due-charge'
import {
  PixImediateChargeCreateProps,
  PixImediateChargeFindManyProps,
  PixImediateChargeFindUniqueProps,
  PixImediateChargeResponseType,
  PixImediateChargeUpdateProps,
} from './domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-imediate-charge/@interfaces-pix-imediate-charge'
import {
  PixManageResponseType,
  PixManageReturnResponseType,
  PixWebhooksConsultManyProps,
  PixWebhooksConsultReturnProps,
  PixWebhooksReturnProps,
} from './domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-manage/@interfaces-pix-manage'
import {
  PixPayloadLocationsCreateProps,
  PixPayloadLocationsDetachTxIdProps,
  PixPayloadLocationsFindManyProps,
  PixPayloadLocationsFindUniqueProps,
  PixPayloadLocationsGenerateQrCodeProps,
  PixPayloadLocationsGenerateQrCodeResponseType,
  PixPayloadLocationsResponseType,
} from './domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payload-locations/@interfaces-pix-payload-locations'
import {
  PixPaymentSplitAttachDueChargeProps,
  PixPaymentSplitAttachImediateChargeProps,
  PixPaymentSplitCreateProps,
  PixPaymentSplitDeleteImediateChargeAttachmentProps,
  PixPaymentSplitFindUniqueDueChargeAttachmentProps,
  PixPaymentSplitFindUniqueDueChargeAttachmentResponseType,
  PixPaymentSplitFindUniqueImediateChargeAttachmentResponseType,
  PixPaymentSplitFindUniqueProps,
  PixPaymentSplitResponseType,
} from './domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-payment-split/@interfaces-pix-payment-split'
import {
  PixSendAndPaymentSendProps,
  PixSendAndPaymentSendResponseType,
} from './domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-send-and-payment/@interfaces-pix-send-and-payment'
import {
  PixWebhooksAddProps,
  PixWebhooksDeleteProps,
  PixWebhooksFindManyProps,
  PixWebhooksFindUniqueProps,
  PixWebhooksResponseType,
} from './domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks/@interfaces-pix-webhooks'

// type oi =

export type {
  // pix =============================================================
  // common
  PixFilterSearchParamsProps,
  PixFilterSearchProps,
  PixFilterSearchRawParamsProps,
  PixFilterSearchRawProps,
  // imediateCharge
  PixImediateChargeCreateProps,
  PixImediateChargeUpdateProps,
  PixImediateChargeFindUniqueProps,
  PixImediateChargeFindManyProps,
  PixImediateChargeResponseType,
  // dueCharge
  PixDueChargeCreateProps,
  PixDueChargeUpdateProps,
  PixDueChargeFindUniqueProps,
  PixDueChargeFindManyProps,
  // batchCollections
  PixBatchCollectionsCreateOrUpdateDueChargeBatchProps,
  PixBatchCollectionsUpdateDueChargeBatchProps,
  PixBatchCollectionsFindUniqueDueChargeBatchProps,
  PixBatchCollectionsFindManyDueChargeBatchProps,
  PixBatchCollectionsBatchResponseType,
  // manage
  PixWebhooksConsultManyProps,
  PixWebhooksReturnProps,
  PixWebhooksConsultReturnProps,
  PixManageReturnResponseType,
  PixManageResponseType,
  // payloadLocations
  PixPayloadLocationsCreateProps,
  PixPayloadLocationsFindUniqueProps,
  PixPayloadLocationsFindManyProps,
  PixPayloadLocationsGenerateQrCodeProps,
  PixPayloadLocationsDetachTxIdProps,
  PixPayloadLocationsResponseType,
  PixPayloadLocationsGenerateQrCodeResponseType,
  // paymentSplit
  PixPaymentSplitCreateProps,
  PixPaymentSplitFindUniqueProps,
  PixPaymentSplitAttachImediateChargeProps,
  PixPaymentSplitAttachDueChargeProps,
  PixPaymentSplitFindUniqueDueChargeAttachmentProps,
  PixPaymentSplitFindUniqueImediateChargeAttachmentResponseType,
  PixPaymentSplitFindUniqueDueChargeAttachmentResponseType,
  PixPaymentSplitDeleteImediateChargeAttachmentProps,
  PixPaymentSplitResponseType,
  // sendAndPayment
  PixSendAndPaymentSendProps,
  PixSendAndPaymentSendResponseType,
  // webhooks
  PixWebhooksAddProps,
  PixWebhooksFindUniqueProps,
  PixWebhooksFindManyProps,
  PixWebhooksDeleteProps,
  PixWebhooksResponseType,
}
