import type { DeliveryStatusType } from '../DeliveryStatusType';
import type { FFDeliveryResponseDtoType } from '../FFDeliveryResponseDtoType';

export type FFDeliveriesGetFFDeliveriesQueryParamsType = {
  /**
   * @type string | undefined
   */
  status?: DeliveryStatusType;
  /**
   * @description Дата начала периода в формате ISO (YYYY-MM-DD)
   * @type string | undefined
   */
  startDate?: string;
  /**
   * @description Дата окончания периода в формате ISO (YYYY-MM-DD)
   * @type string | undefined
   */
  endDate?: string;
};

/**
 * @description Список поставок на ФФ успешно получен
 */
export type FFDeliveriesGetFFDeliveries200Type = FFDeliveryResponseDtoType;

/**
 * @description Не авторизован
 */
export type FFDeliveriesGetFFDeliveries401Type = any;

export type FFDeliveriesGetFFDeliveriesQueryResponseType = FFDeliveriesGetFFDeliveries200Type;

export type FFDeliveriesGetFFDeliveriesTypeQuery = {
  Response: FFDeliveriesGetFFDeliveries200Type;
  QueryParams: FFDeliveriesGetFFDeliveriesQueryParamsType;
  Errors: FFDeliveriesGetFFDeliveries401Type;
};
