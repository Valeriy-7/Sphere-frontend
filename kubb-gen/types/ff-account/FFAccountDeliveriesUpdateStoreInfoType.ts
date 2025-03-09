import type { UpdateStoreInfoDtoType } from '../UpdateStoreInfoDtoType';

export type FFAccountDeliveriesUpdateStoreInfoPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string;
};

/**
 * @description Информация о магазине успешно обновлена
 */
export type FFAccountDeliveriesUpdateStoreInfo200Type = any;

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesUpdateStoreInfo404Type = any;

/**
 * @description Данные для обновления информации о магазине
 */
export type FFAccountDeliveriesUpdateStoreInfoMutationRequestType = UpdateStoreInfoDtoType;

export type FFAccountDeliveriesUpdateStoreInfoMutationResponseType =
  FFAccountDeliveriesUpdateStoreInfo200Type;

export type FFAccountDeliveriesUpdateStoreInfoTypeMutation = {
  Response: FFAccountDeliveriesUpdateStoreInfo200Type;
  Request: FFAccountDeliveriesUpdateStoreInfoMutationRequestType;
  PathParams: FFAccountDeliveriesUpdateStoreInfoPathParamsType;
  Errors: FFAccountDeliveriesUpdateStoreInfo404Type;
};
