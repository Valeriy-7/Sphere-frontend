export type FFAccountDeliveriesUpdateLogisticsProviderPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Логист успешно обновлен
 */
export type FFAccountDeliveriesUpdateLogisticsProvider200Type = any

/**
 * @description Поставка не найдена или логист не найден
 */
export type FFAccountDeliveriesUpdateLogisticsProvider404Type = any

export type FFAccountDeliveriesUpdateLogisticsProviderMutationResponseType = FFAccountDeliveriesUpdateLogisticsProvider200Type

export type FFAccountDeliveriesUpdateLogisticsProviderTypeMutation = {
  Response: FFAccountDeliveriesUpdateLogisticsProvider200Type
  PathParams: FFAccountDeliveriesUpdateLogisticsProviderPathParamsType
  Errors: FFAccountDeliveriesUpdateLogisticsProvider404Type
}