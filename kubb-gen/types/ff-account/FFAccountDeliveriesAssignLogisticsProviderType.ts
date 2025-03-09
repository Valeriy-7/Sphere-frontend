import type { AssignLogisticsProviderDtoType } from '../AssignLogisticsProviderDtoType';

export type FFAccountDeliveriesAssignLogisticsProviderPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string;
};

/**
 * @description Логист успешно назначен
 */
export type FFAccountDeliveriesAssignLogisticsProvider200Type = any;

/**
 * @description Поставка или логист не найдены
 */
export type FFAccountDeliveriesAssignLogisticsProvider404Type = any;

/**
 * @description Данные для назначения логиста
 */
export type FFAccountDeliveriesAssignLogisticsProviderMutationRequestType =
  AssignLogisticsProviderDtoType;

export type FFAccountDeliveriesAssignLogisticsProviderMutationResponseType =
  FFAccountDeliveriesAssignLogisticsProvider200Type;

export type FFAccountDeliveriesAssignLogisticsProviderTypeMutation = {
  Response: FFAccountDeliveriesAssignLogisticsProvider200Type;
  Request: FFAccountDeliveriesAssignLogisticsProviderMutationRequestType;
  PathParams: FFAccountDeliveriesAssignLogisticsProviderPathParamsType;
  Errors: FFAccountDeliveriesAssignLogisticsProvider404Type;
};
