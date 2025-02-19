import type { CreateServiceDtoType } from '../CreateServiceDtoType'
import type { ServiceType } from '../ServiceType'

export type ServicesCreateService201Type = ServiceType

export type ServicesCreateServiceMutationRequestType = CreateServiceDtoType

export type ServicesCreateServiceMutationResponseType = ServicesCreateService201Type

export type ServicesCreateServiceTypeMutation = {
  Response: ServicesCreateService201Type
  Request: ServicesCreateServiceMutationRequestType
  Errors: any
}