import type { CreateLogisticsDtoType } from '../CreateLogisticsDtoType'
import type { LogisticsType } from '../LogisticsType'

export type LogisticsUpdateLogisticsPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Логистика успешно обновлена
 */
export type LogisticsUpdateLogistics200Type = LogisticsType

export type LogisticsUpdateLogisticsMutationRequestType = CreateLogisticsDtoType

export type LogisticsUpdateLogisticsMutationResponseType = LogisticsUpdateLogistics200Type

export type LogisticsUpdateLogisticsTypeMutation = {
  Response: LogisticsUpdateLogistics200Type
  Request: LogisticsUpdateLogisticsMutationRequestType
  PathParams: LogisticsUpdateLogisticsPathParamsType
  Errors: any
}