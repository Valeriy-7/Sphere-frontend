import { FFDeliveryProductDtoSchema } from '../FFDeliveryProductDtoSchema';
import { z } from 'zod';

export const FFAccountDeliveriesGetDeliveryProductsPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
});

export const FFAccountDeliveriesGetDeliveryProductsQueryParamsSchema = z
  .object({
    supplierId: z.string().uuid().describe('Фильтр по идентификатору поставщика').optional(),
  })
  .optional();

/**
 * @description Список товаров поставки
 */
export const FFAccountDeliveriesGetDeliveryProducts200Schema = z.array(
  z.lazy(() => FFDeliveryProductDtoSchema),
);

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesGetDeliveryProducts404Schema = z.any();

export const FFAccountDeliveriesGetDeliveryProductsQueryResponseSchema = z.lazy(
  () => FFAccountDeliveriesGetDeliveryProducts200Schema,
);
