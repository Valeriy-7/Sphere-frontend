import { createSupplierDtoSchema } from '../createSupplierDtoSchema';
import { supplierResponseExampleSchema } from '../supplierResponseExampleSchema';
import { z } from 'zod';

/**
 * @description Поставщик успешно создан
 */
export const deliveriesCreateSupplier201Schema = z.lazy(() => supplierResponseExampleSchema);

/**
 * @description Некорректные данные запроса
 */
export const deliveriesCreateSupplier400Schema = z.any();

/**
 * @description Не авторизован
 */
export const deliveriesCreateSupplier401Schema = z.any();

export const deliveriesCreateSupplierMutationRequestSchema = z.lazy(() => createSupplierDtoSchema);

export const deliveriesCreateSupplierMutationResponseSchema = z.lazy(
  () => deliveriesCreateSupplier201Schema,
);
