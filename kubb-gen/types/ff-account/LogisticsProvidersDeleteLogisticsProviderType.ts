export type LogisticsProvidersDeleteLogisticsProviderPathParamsType = {
  /**
   * @description Идентификатор логиста
   * @type string, uuid
   */
  id: string
}

/**
 * @description Логист успешно удален
 */
export type LogisticsProvidersDeleteLogisticsProvider200Type = any

/**
 * @description Логист не найден
 */
export type LogisticsProvidersDeleteLogisticsProvider404Type = any

export type LogisticsProvidersDeleteLogisticsProviderMutationResponseType = LogisticsProvidersDeleteLogisticsProvider200Type

export type LogisticsProvidersDeleteLogisticsProviderTypeMutation = {
  Response: LogisticsProvidersDeleteLogisticsProvider200Type
  PathParams: LogisticsProvidersDeleteLogisticsProviderPathParamsType
  Errors: LogisticsProvidersDeleteLogisticsProvider404Type
}