import type { ReceptionRequestDtoType } from '../ReceptionRequestDtoType'

export type FFAccountDeliveriesProcessReceptionPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Приемка успешно обработана
 */
export type FFAccountDeliveriesProcessReception200Type = any

/**
 * @description Ошибка валидации данных приемки
 */
export type FFAccountDeliveriesProcessReception400Type = any

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesProcessReception404Type = any

/**
 * @description Данные для обработки приемки
 */
export type FFAccountDeliveriesProcessReceptionMutationRequestType = ReceptionRequestDtoType

export type FFAccountDeliveriesProcessReceptionMutationResponseType = FFAccountDeliveriesProcessReception200Type

export type FFAccountDeliveriesProcessReceptionTypeMutation = {
  Response: FFAccountDeliveriesProcessReception200Type
  Request: FFAccountDeliveriesProcessReceptionMutationRequestType
  PathParams: FFAccountDeliveriesProcessReceptionPathParamsType
  Errors: FFAccountDeliveriesProcessReception400Type | FFAccountDeliveriesProcessReception404Type
}