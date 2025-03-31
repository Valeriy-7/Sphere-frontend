import type { ConsumableType } from '../ConsumableType'

/**
 * @description Список расходников
 */
export type LogisticsGetConsumables200Type = ConsumableType[]

export type LogisticsGetConsumablesQueryResponseType = LogisticsGetConsumables200Type

export type LogisticsGetConsumablesTypeQuery = {
  Response: LogisticsGetConsumables200Type
  Errors: any
}