import type { LogisticsProviderListItemDtoType } from '../LogisticsProviderListItemDtoType'

export type LogisticsProvidersGetLogisticsProviderPathParamsType = {
  /**
   * @description Идентификатор логиста
   * @type string, uuid
   */
  id: string
}

/**
 * @description Информация о логисте
 */
export type LogisticsProvidersGetLogisticsProvider200Type = LogisticsProviderListItemDtoType

/**
 * @description Логист не найден
 */
export type LogisticsProvidersGetLogisticsProvider404Type = any

export type LogisticsProvidersGetLogisticsProviderQueryResponseType = LogisticsProvidersGetLogisticsProvider200Type

export type LogisticsProvidersGetLogisticsProviderTypeQuery = {
  Response: LogisticsProvidersGetLogisticsProvider200Type
  PathParams: LogisticsProvidersGetLogisticsProviderPathParamsType
  Errors: LogisticsProvidersGetLogisticsProvider404Type
}