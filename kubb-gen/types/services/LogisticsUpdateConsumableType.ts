import type { ConsumableType } from '../ConsumableType'
import type { CreateConsumableDtoType } from '../CreateConsumableDtoType'

export type LogisticsUpdateConsumablePathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Расходник успешно обновлен
 */
export type LogisticsUpdateConsumable200Type = ConsumableType

export type LogisticsUpdateConsumableMutationRequestType = CreateConsumableDtoType

export type LogisticsUpdateConsumableMutationResponseType = LogisticsUpdateConsumable200Type

export type LogisticsUpdateConsumableTypeMutation = {
  Response: LogisticsUpdateConsumable200Type
  Request: LogisticsUpdateConsumableMutationRequestType
  PathParams: LogisticsUpdateConsumablePathParamsType
  Errors: any
}