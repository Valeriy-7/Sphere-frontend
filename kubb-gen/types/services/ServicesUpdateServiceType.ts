import type { CreateServiceDtoType } from '../CreateServiceDtoType'
import type { ServiceType } from '../ServiceType'

export type ServicesUpdateServicePathParamsType = {
  /**
   * @type string
   */
  id: string
}

export type ServicesUpdateService200Type = ServiceType

export type ServicesUpdateServiceMutationRequestType = CreateServiceDtoType

export type ServicesUpdateServiceMutationResponseType = ServicesUpdateService200Type

export type ServicesUpdateServiceTypeMutation = {
  Response: ServicesUpdateService200Type
  Request: ServicesUpdateServiceMutationRequestType
  PathParams: ServicesUpdateServicePathParamsType
  Errors: any
}