import type { DeliveryResponseExampleType } from '../DeliveryResponseExampleType';

/**
 * @description Список поставок успешно получен
 */
export type DeliveriesGetDeliveries200Type = DeliveryResponseExampleType[];

/**
 * @description Не авторизован
 */
export type DeliveriesGetDeliveries401Type = any;

export type DeliveriesGetDeliveriesQueryResponseType = DeliveriesGetDeliveries200Type;

export type DeliveriesGetDeliveriesTypeQuery = {
  Response: DeliveriesGetDeliveries200Type;
  Errors: DeliveriesGetDeliveries401Type;
};
