export type FFAccountDeliveriesCompletePreparationPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Подготовка успешно завершена, статус обновлен на COMPLETED
 */
export type FFAccountDeliveriesCompletePreparation200Type = any

/**
 * @description Ошибка валидации (не все кол-ва заполнены) или неверный статус
 */
export type FFAccountDeliveriesCompletePreparation400Type = any

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesCompletePreparation404Type = any

export type FFAccountDeliveriesCompletePreparationMutationResponseType = FFAccountDeliveriesCompletePreparation200Type

export type FFAccountDeliveriesCompletePreparationTypeMutation = {
  Response: FFAccountDeliveriesCompletePreparation200Type
  PathParams: FFAccountDeliveriesCompletePreparationPathParamsType
  Errors: FFAccountDeliveriesCompletePreparation400Type | FFAccountDeliveriesCompletePreparation404Type
}