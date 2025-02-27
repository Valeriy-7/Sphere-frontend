import type { SupplierResponseExampleType } from '../SupplierResponseExampleType';

/**
 * @description Список поставщиков успешно получен
 */
export type DeliveriesGetSuppliers200Type = SupplierResponseExampleType[];

/**
 * @description Не авторизован
 */
export type DeliveriesGetSuppliers401Type = any;

export type DeliveriesGetSuppliersQueryResponseType = DeliveriesGetSuppliers200Type;

export type DeliveriesGetSuppliersTypeQuery = {
  Response: DeliveriesGetSuppliers200Type;
  Errors: DeliveriesGetSuppliers401Type;
};
