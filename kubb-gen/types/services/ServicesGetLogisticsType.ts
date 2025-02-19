import type { LogisticsType } from '../LogisticsType'

export type ServicesGetLogistics200Type = LogisticsType[]

export type ServicesGetLogisticsQueryResponseType = ServicesGetLogistics200Type

export type ServicesGetLogisticsTypeQuery = {
  Response: ServicesGetLogistics200Type
  Errors: any
}