import type { CreateServiceDtoType } from '../CreateServiceDtoType'
import type { ServiceType } from '../ServiceType'

export type LogisticsUpdateServicePathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Услуга успешно обновлена
 */
export type LogisticsUpdateService200Type = ServiceType

export type LogisticsUpdateServiceMutationRequestType = CreateServiceDtoType

export type LogisticsUpdateServiceMutationResponseType = LogisticsUpdateService200Type

export type LogisticsUpdateServiceTypeMutation = {
  Response: LogisticsUpdateService200Type
  Request: LogisticsUpdateServiceMutationRequestType
  PathParams: LogisticsUpdateServicePathParamsType
  Errors: any
}