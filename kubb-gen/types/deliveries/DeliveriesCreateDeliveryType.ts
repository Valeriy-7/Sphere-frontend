import type { CreateDeliveryDtoType } from '../CreateDeliveryDtoType';
import type { DeliveryResponseExampleType } from '../DeliveryResponseExampleType';

/**
 * @description Поставка успешно создана
 */
export type DeliveriesCreateDelivery201Type = DeliveryResponseExampleType;

/**
 * @description Некорректные данные запроса
 */
export type DeliveriesCreateDelivery400Type = any;

/**
 * @description Не авторизован
 */
export type DeliveriesCreateDelivery401Type = any;

export type DeliveriesCreateDeliveryMutationRequestType = CreateDeliveryDtoType;

export type DeliveriesCreateDeliveryMutationResponseType = DeliveriesCreateDelivery201Type;

export type DeliveriesCreateDeliveryTypeMutation = {
  Response: DeliveriesCreateDelivery201Type;
  Request: DeliveriesCreateDeliveryMutationRequestType;
  Errors: DeliveriesCreateDelivery400Type | DeliveriesCreateDelivery401Type;
};
