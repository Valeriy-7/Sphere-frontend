import type { ServiceType } from '../ServiceType'

/**
 * @description Список услуг
 */
export type LogisticsGetServices200Type = ServiceType[]

export type LogisticsGetServicesQueryResponseType = LogisticsGetServices200Type

export type LogisticsGetServicesTypeQuery = {
  Response: LogisticsGetServices200Type
  Errors: any
}