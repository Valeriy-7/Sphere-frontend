export type FFAccountDeliveriesStartPreparationPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Подготовка успешно начата
 */
export type FFAccountDeliveriesStartPreparation200Type = any

/**
 * @description Неверный статус поставки или подготовка уже начата
 */
export type FFAccountDeliveriesStartPreparation400Type = any

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesStartPreparation404Type = any

export type FFAccountDeliveriesStartPreparationMutationResponseType = FFAccountDeliveriesStartPreparation200Type

export type FFAccountDeliveriesStartPreparationTypeMutation = {
  Response: FFAccountDeliveriesStartPreparation200Type
  PathParams: FFAccountDeliveriesStartPreparationPathParamsType
  Errors: FFAccountDeliveriesStartPreparation400Type | FFAccountDeliveriesStartPreparation404Type
}