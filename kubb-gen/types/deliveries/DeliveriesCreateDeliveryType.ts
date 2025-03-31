import type { CreateDeliveryDtoType } from '../CreateDeliveryDtoType'
import type { DeliveryType } from '../DeliveryType'

/**
 * @description Поставка успешно создана
 */
export type DeliveriesCreateDelivery201Type = DeliveryType

/**
 * @description Некорректные данные в запросе
 */
export type DeliveriesCreateDelivery400Type = any

/**
 * @description Кабинет не найден
 */
export type DeliveriesCreateDelivery404Type = any

export type DeliveriesCreateDeliveryMutationRequestType = CreateDeliveryDtoType

export type DeliveriesCreateDeliveryMutationResponseType = DeliveriesCreateDelivery201Type

export type DeliveriesCreateDeliveryTypeMutation = {
  Response: DeliveriesCreateDelivery201Type
  Request: DeliveriesCreateDeliveryMutationRequestType
  Errors: DeliveriesCreateDelivery400Type | DeliveriesCreateDelivery404Type
}