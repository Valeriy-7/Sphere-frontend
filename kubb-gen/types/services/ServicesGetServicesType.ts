import type { ServiceType } from '../ServiceType'

export type ServicesGetServices200Type = ServiceType[]

export type ServicesGetServicesQueryResponseType = ServicesGetServices200Type

export type ServicesGetServicesTypeQuery = {
  Response: ServicesGetServices200Type
  Errors: any
}