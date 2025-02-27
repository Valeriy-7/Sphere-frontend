import type { ConsumableResponseExampleType } from '../ConsumableResponseExampleType';

/**
 * @description Список расходников успешно получен
 */
export type DeliveriesGetFulfillmentConsumables200Type = ConsumableResponseExampleType[];

/**
 * @description Не авторизован
 */
export type DeliveriesGetFulfillmentConsumables401Type = any;

/**
 * @description Фулфилмент кабинет не найден
 */
export type DeliveriesGetFulfillmentConsumables404Type = any;

export type DeliveriesGetFulfillmentConsumablesQueryResponseType =
  DeliveriesGetFulfillmentConsumables200Type;

export type DeliveriesGetFulfillmentConsumablesTypeQuery = {
  Response: DeliveriesGetFulfillmentConsumables200Type;
  Errors: DeliveriesGetFulfillmentConsumables401Type | DeliveriesGetFulfillmentConsumables404Type;
};
