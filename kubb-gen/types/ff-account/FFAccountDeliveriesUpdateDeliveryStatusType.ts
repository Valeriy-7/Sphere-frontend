import type { UpdateDeliveryStatusDtoType } from '../UpdateDeliveryStatusDtoType';

export type FFAccountDeliveriesUpdateDeliveryStatusPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string;
};

/**
 * @description Статус поставки успешно обновлен
 */
export type FFAccountDeliveriesUpdateDeliveryStatus200Type = any;

/**
 * @description Недопустимый переход статуса
 */
export type FFAccountDeliveriesUpdateDeliveryStatus400Type = any;

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesUpdateDeliveryStatus404Type = any;

/**
 * @description Данные для обновления статуса поставки
 */
export type FFAccountDeliveriesUpdateDeliveryStatusMutationRequestType =
  UpdateDeliveryStatusDtoType;

export type FFAccountDeliveriesUpdateDeliveryStatusMutationResponseType =
  FFAccountDeliveriesUpdateDeliveryStatus200Type;

export type FFAccountDeliveriesUpdateDeliveryStatusTypeMutation = {
  Response: FFAccountDeliveriesUpdateDeliveryStatus200Type;
  Request: FFAccountDeliveriesUpdateDeliveryStatusMutationRequestType;
  PathParams: FFAccountDeliveriesUpdateDeliveryStatusPathParamsType;
  Errors:
    | FFAccountDeliveriesUpdateDeliveryStatus400Type
    | FFAccountDeliveriesUpdateDeliveryStatus404Type;
};
