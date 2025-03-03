import type { DeliveryPointDtoType } from '../DeliveryPointDtoType';

export type DeliveryPointsGetAllDeliveryPointsQueryParamsType = {
  /**
   * @description ID кабинета для приоритизации фулфилментов
   * @type string | undefined
   */
  cabinetId?: string;
};

/**
 * @description Полный список точек доставки
 */
export type DeliveryPointsGetAllDeliveryPoints200Type = DeliveryPointDtoType[];

export type DeliveryPointsGetAllDeliveryPointsQueryResponseType =
  DeliveryPointsGetAllDeliveryPoints200Type;

export type DeliveryPointsGetAllDeliveryPointsTypeQuery = {
  Response: DeliveryPointsGetAllDeliveryPoints200Type;
  QueryParams: DeliveryPointsGetAllDeliveryPointsQueryParamsType;
  Errors: any;
};
