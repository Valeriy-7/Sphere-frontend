import type { PreparationEventDtoType } from '../PreparationEventDtoType'

/**
 * @description Preparation event processed successfully
 */
export type FFStorageProcessPreparationEvent201Type = any

/**
 * @description Delivery not found
 */
export type FFStorageProcessPreparationEvent404Type = any

export type FFStorageProcessPreparationEventMutationRequestType = PreparationEventDtoType

export type FFStorageProcessPreparationEventMutationResponseType = FFStorageProcessPreparationEvent201Type

export type FFStorageProcessPreparationEventTypeMutation = {
  Response: FFStorageProcessPreparationEvent201Type
  Request: FFStorageProcessPreparationEventMutationRequestType
  Errors: FFStorageProcessPreparationEvent404Type
}