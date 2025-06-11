import type { LogisticsTypeType } from '../LogisticsTypeType'

/**
 * @description Список типов логистики успешно получен
 */
export type LogisticsTypeGetLogisticsTypes200Type = LogisticsTypeType[]

export type LogisticsTypeGetLogisticsTypesQueryResponseType = LogisticsTypeGetLogisticsTypes200Type

export type LogisticsTypeGetLogisticsTypesTypeQuery = {
  Response: LogisticsTypeGetLogisticsTypes200Type
  Errors: any
}