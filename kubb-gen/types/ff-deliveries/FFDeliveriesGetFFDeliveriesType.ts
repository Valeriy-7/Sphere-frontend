import type { DeliveryStatusType } from '../DeliveryStatusType';
import type { FFDeliveryResponseDtoType } from '../FFDeliveryResponseDtoType';

export type FFDeliveriesGetFFDeliveriesQueryParamsType = {
  /**
   * @description Номер страницы
   * @minLength 1
   * @default 1
   * @type number | undefined
   */
  page?: number;
  /**
   * @description Количество записей на странице. Для получения всех записей установите значение -1.
   * @minLength -1
   * @maxLength 100
   * @default 10
   * @type number | undefined
   */
  limit?: number;
  /**
   * @type string | undefined
   */
  status?: DeliveryStatusType;
  /**
   * @description Дата начала периода в формате ISO (YYYY-MM-DD)
   * @type string | undefined, date-time
   */
  startDate?: string;
  /**
   * @description Дата окончания периода в формате ISO (YYYY-MM-DD)
   * @type string | undefined, date-time
   */
  endDate?: string;
};

/**
 * @description Список поставок и сводная информация
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
