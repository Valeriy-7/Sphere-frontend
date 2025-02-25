import type { ConsumableType } from '../ConsumableType'
import type { CreateConsumableDtoType } from '../CreateConsumableDtoType'

/**
 * @description Расходник успешно создан
 */
export type LogisticsCreateConsumable201Type = ConsumableType

export type LogisticsCreateConsumableMutationRequestType = CreateConsumableDtoType

export type LogisticsCreateConsumableMutationResponseType = LogisticsCreateConsumable201Type

export type LogisticsCreateConsumableTypeMutation = {
  Response: LogisticsCreateConsumable201Type
  Request: LogisticsCreateConsumableMutationRequestType
  Errors: any
}