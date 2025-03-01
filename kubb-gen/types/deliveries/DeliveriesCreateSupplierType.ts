import type { CreateSupplierDtoType } from '../CreateSupplierDtoType';
import type { SupplierType } from '../SupplierType';

/**
 * @description Поставщик успешно создан
 */
export type DeliveriesCreateSupplier201Type = SupplierType;

/**
 * @description Некорректные данные запроса
 */
export type DeliveriesCreateSupplier400Type = any;

/**
 * @description Не авторизован
 */
export type DeliveriesCreateSupplier401Type = any;

export type DeliveriesCreateSupplierMutationRequestType = CreateSupplierDtoType;

export type DeliveriesCreateSupplierMutationResponseType = DeliveriesCreateSupplier201Type;

export type DeliveriesCreateSupplierTypeMutation = {
  Response: DeliveriesCreateSupplier201Type;
  Request: DeliveriesCreateSupplierMutationRequestType;
  Errors: DeliveriesCreateSupplier400Type | DeliveriesCreateSupplier401Type;
};
