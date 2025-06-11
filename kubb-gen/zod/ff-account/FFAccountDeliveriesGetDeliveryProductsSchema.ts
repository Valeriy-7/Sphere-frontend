import { FFDeliveryProductDtoSchema } from '../FFDeliveryProductDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesGetDeliveryProductsPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

export const FFAccountDeliveriesGetDeliveryProductsQueryParamsSchema = z
  .object({
    supplierId: z.string().describe('ID поставщика для фильтрации (необязательно)').optional(),
  })
  .optional()

/**
 * @description Список продуктов
 */
export const FFAccountDeliveriesGetDeliveryProducts200Schema = z.array(z.lazy(() => FFDeliveryProductDtoSchema))

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesGetDeliveryProducts404Schema = z.any()

export const FFAccountDeliveriesGetDeliveryProductsQueryResponseSchema = z.lazy(() => FFAccountDeliveriesGetDeliveryProducts200Schema)