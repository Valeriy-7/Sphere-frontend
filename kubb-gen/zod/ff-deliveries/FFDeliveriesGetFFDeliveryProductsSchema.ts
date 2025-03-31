import { FFDeliveryProductDtoSchema } from '../FFDeliveryProductDtoSchema'
import { z } from 'zod'

export const FFDeliveriesGetFFDeliveryProductsPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

export const FFDeliveriesGetFFDeliveryProductsQueryParamsSchema = z
  .object({
    supplierId: z.string().uuid().describe('Фильтр по ID поставщика').optional(),
  })
  .optional()

/**
 * @description Список товаров в поставке на ФФ успешно получен
 */
export const FFDeliveriesGetFFDeliveryProducts200Schema = z.array(z.lazy(() => FFDeliveryProductDtoSchema))

/**
 * @description Неверный запрос (например, неверный формат UUID)
 */
export const FFDeliveriesGetFFDeliveryProducts400Schema = z.any()

/**
 * @description Не авторизован
 */
export const FFDeliveriesGetFFDeliveryProducts401Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFDeliveriesGetFFDeliveryProducts404Schema = z.any()

export const FFDeliveriesGetFFDeliveryProductsQueryResponseSchema = z.lazy(() => FFDeliveriesGetFFDeliveryProducts200Schema)