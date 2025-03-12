import type { DeliveryType } from '../DeliveryType';

export type DeliveriesGetDeliveriesQueryParamsType = {
  /**
   * @description Дата начала периода
   * @type string | undefined, date-time
   */
  startDate?: string;
  /**
   * @description Дата окончания периода
   * @type string | undefined, date-time
   */
  endDate?: string;
};

/**
 * @description Список поставок успешно получен
 */
export type DeliveriesGetDeliveries200Type = DeliveryType[];

export type DeliveriesGetDeliveriesQueryResponseType = DeliveriesGetDeliveries200Type;

export type DeliveriesGetDeliveriesTypeQuery = {
  Response: DeliveriesGetDeliveries200Type;
  QueryParams: DeliveriesGetDeliveriesQueryParamsType;
  Errors: any;
};
