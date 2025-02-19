import type { ConsumableType } from '../ConsumableType'

export type ServicesGetConsumables200Type = ConsumableType[]

export type ServicesGetConsumablesQueryResponseType = ServicesGetConsumables200Type

export type ServicesGetConsumablesTypeQuery = {
  Response: ServicesGetConsumables200Type
  Errors: any
}