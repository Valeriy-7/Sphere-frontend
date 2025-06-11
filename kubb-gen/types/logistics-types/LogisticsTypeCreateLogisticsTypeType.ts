import type { CreateLogisticsTypeDtoType } from '../CreateLogisticsTypeDtoType'
import type { LogisticsTypeType } from '../LogisticsTypeType'

/**
 * @description Тип логистики успешно создан
 */
export type LogisticsTypeCreateLogisticsType201Type = LogisticsTypeType

export type LogisticsTypeCreateLogisticsTypeMutationRequestType = CreateLogisticsTypeDtoType

export type LogisticsTypeCreateLogisticsTypeMutationResponseType = LogisticsTypeCreateLogisticsType201Type

export type LogisticsTypeCreateLogisticsTypeTypeMutation = {
  Response: LogisticsTypeCreateLogisticsType201Type
  Request: LogisticsTypeCreateLogisticsTypeMutationRequestType
  Errors: any
}