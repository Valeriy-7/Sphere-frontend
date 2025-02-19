import type { ConsumableType } from '../ConsumableType'
import type { CreateConsumableDtoType } from '../CreateConsumableDtoType'

export type ServicesUpdateConsumablePathParamsType = {
  /**
   * @type string
   */
  id: string
}

export type ServicesUpdateConsumable200Type = ConsumableType

export type ServicesUpdateConsumableMutationRequestType = CreateConsumableDtoType

export type ServicesUpdateConsumableMutationResponseType = ServicesUpdateConsumable200Type

export type ServicesUpdateConsumableTypeMutation = {
  Response: ServicesUpdateConsumable200Type
  Request: ServicesUpdateConsumableMutationRequestType
  PathParams: ServicesUpdateConsumablePathParamsType
  Errors: any
}