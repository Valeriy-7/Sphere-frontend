import { supplierSchema } from '../supplierSchema';
import { z } from 'zod';

/**
 * @description Список поставщиков успешно получен
 */
export const deliveriesGetSuppliers200Schema = z.array(z.lazy(() => supplierSchema));

/**
 * @description Не авторизован
 */
export const deliveriesGetSuppliers401Schema = z.any();

export const deliveriesGetSuppliersQueryResponseSchema = z.lazy(
  () => deliveriesGetSuppliers200Schema,
);
