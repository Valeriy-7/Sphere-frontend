import type { ServiceResponseExampleType } from '../ServiceResponseExampleType';

/**
 * @description Список услуг успешно получен
 */
export type DeliveriesGetFulfillmentServices200Type = ServiceResponseExampleType[];

/**
 * @description Не авторизован
 */
export type DeliveriesGetFulfillmentServices401Type = any;

/**
 * @description Фулфилмент кабинет не найден
 */
export type DeliveriesGetFulfillmentServices404Type = any;

export type DeliveriesGetFulfillmentServicesQueryResponseType =
  DeliveriesGetFulfillmentServices200Type;

export type DeliveriesGetFulfillmentServicesTypeQuery = {
  Response: DeliveriesGetFulfillmentServices200Type;
  Errors: DeliveriesGetFulfillmentServices401Type | DeliveriesGetFulfillmentServices404Type;
};
