import type { CreateLogisticsDtoType } from '../CreateLogisticsDtoType'
import type { LogisticsType } from '../LogisticsType'

export type ServicesCreateLogistics201Type = LogisticsType

export type ServicesCreateLogisticsMutationRequestType = CreateLogisticsDtoType

export type ServicesCreateLogisticsMutationResponseType = ServicesCreateLogistics201Type

export type ServicesCreateLogisticsTypeMutation = {
  Response: ServicesCreateLogistics201Type
  Request: ServicesCreateLogisticsMutationRequestType
  Errors: any
}