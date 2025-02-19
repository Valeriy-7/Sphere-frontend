import type { CreateLogisticsDtoType } from '../CreateLogisticsDtoType'
import type { LogisticsType } from '../LogisticsType'

export type ServicesUpdateLogisticsPathParamsType = {
  /**
   * @type string
   */
  id: string
}

export type ServicesUpdateLogistics200Type = LogisticsType

export type ServicesUpdateLogisticsMutationRequestType = CreateLogisticsDtoType

export type ServicesUpdateLogisticsMutationResponseType = ServicesUpdateLogistics200Type

export type ServicesUpdateLogisticsTypeMutation = {
  Response: ServicesUpdateLogistics200Type
  Request: ServicesUpdateLogisticsMutationRequestType
  PathParams: ServicesUpdateLogisticsPathParamsType
  Errors: any
}