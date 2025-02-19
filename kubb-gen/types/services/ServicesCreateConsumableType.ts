import type { ConsumableType } from '../ConsumableType'
import type { CreateConsumableDtoType } from '../CreateConsumableDtoType'

export type ServicesCreateConsumable201Type = ConsumableType

export type ServicesCreateConsumableMutationRequestType = CreateConsumableDtoType

export type ServicesCreateConsumableMutationResponseType = ServicesCreateConsumable201Type

export type ServicesCreateConsumableTypeMutation = {
  Response: ServicesCreateConsumable201Type
  Request: ServicesCreateConsumableMutationRequestType
  Errors: any
}