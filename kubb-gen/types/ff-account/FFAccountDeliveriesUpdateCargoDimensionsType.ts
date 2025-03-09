import type { UpdateCargoDimensionsDtoType } from '../UpdateCargoDimensionsDtoType';

export type FFAccountDeliveriesUpdateCargoDimensionsPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string;
};

/**
 * @description Размеры груза успешно обновлены
 */
export type FFAccountDeliveriesUpdateCargoDimensions200Type = any;

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesUpdateCargoDimensions404Type = any;

/**
 * @description Данные для обновления размеров груза
 */
export type FFAccountDeliveriesUpdateCargoDimensionsMutationRequestType =
  UpdateCargoDimensionsDtoType;

export type FFAccountDeliveriesUpdateCargoDimensionsMutationResponseType =
  FFAccountDeliveriesUpdateCargoDimensions200Type;

export type FFAccountDeliveriesUpdateCargoDimensionsTypeMutation = {
  Response: FFAccountDeliveriesUpdateCargoDimensions200Type;
  Request: FFAccountDeliveriesUpdateCargoDimensionsMutationRequestType;
  PathParams: FFAccountDeliveriesUpdateCargoDimensionsPathParamsType;
  Errors: FFAccountDeliveriesUpdateCargoDimensions404Type;
};
