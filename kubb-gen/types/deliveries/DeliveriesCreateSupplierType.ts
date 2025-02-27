import type { CreateSupplierDtoType } from '../CreateSupplierDtoType';
import type { SupplierResponseExampleType } from '../SupplierResponseExampleType';

/**
 * @description Поставщик успешно создан
 */
export type DeliveriesCreateSupplier201Type = SupplierResponseExampleType;

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
