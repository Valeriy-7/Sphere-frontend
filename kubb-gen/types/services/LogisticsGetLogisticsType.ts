import type { LogisticsType } from '../LogisticsType'

/**
 * @description Список логистики
 */
export type LogisticsGetLogistics200Type = LogisticsType[]

export type LogisticsGetLogisticsQueryResponseType = LogisticsGetLogistics200Type

export type LogisticsGetLogisticsTypeQuery = {
  Response: LogisticsGetLogistics200Type
  Errors: any
}