import type { FFDeliveryResponseDtoType } from '../FFDeliveryResponseDtoType';

export const FFAccountDeliveriesControllerGetDeliveriesQueryParamsStatusEnum = {
  CREATED: 'CREATED',
  IN_PROGRESS: 'IN_PROGRESS',
  ACCEPTED: 'ACCEPTED',
  PREPARATION: 'PREPARATION',
  COMPLETED: 'COMPLETED',
} as const;

export type FFAccountDeliveriesGetDeliveriesQueryParamsStatusEnumType =
  (typeof FFAccountDeliveriesControllerGetDeliveriesQueryParamsStatusEnum)[keyof typeof FFAccountDeliveriesControllerGetDeliveriesQueryParamsStatusEnum];

export type FFAccountDeliveriesGetDeliveriesQueryParamsType = {
  /**
   * @description Фильтр по статусу поставки
   * @type string | undefined
   */
  status?: FFAccountDeliveriesGetDeliveriesQueryParamsStatusEnumType;
  /**
   * @description Начальная дата периода в формате YYYY-MM-DD
   * @type string | undefined
   */
  startDate?: string;
  /**
   * @description Конечная дата периода в формате YYYY-MM-DD
   * @type string | undefined
   */
  endDate?: string;
};

/**
 * @description Список поставок и сводная информация
 */
export type FFAccountDeliveriesGetDeliveries200Type = FFDeliveryResponseDtoType;

export type FFAccountDeliveriesGetDeliveriesQueryResponseType =
  FFAccountDeliveriesGetDeliveries200Type;

export type FFAccountDeliveriesGetDeliveriesTypeQuery = {
  Response: FFAccountDeliveriesGetDeliveries200Type;
  QueryParams: FFAccountDeliveriesGetDeliveriesQueryParamsType;
  Errors: any;
};
