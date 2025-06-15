import { updateProductSizeQuantitiesDtoSchema } from '../updateProductSizeQuantitiesDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesUpdateProductSizeQuantitiesPathParamsSchema = z.object({
  deliveryId: z.string().uuid().describe('ID поставки'),
  productId: z.string().uuid().describe('ID продукта'),
})

/**
 * @description Количества по размерам успешно обновлены
 */
export const FFAccountDeliveriesUpdateProductSizeQuantities200Schema = z.any()

/**
 * @description Ошибка валидации
 */
export const FFAccountDeliveriesUpdateProductSizeQuantities400Schema = z.any()

/**
 * @description Поставка или продукт не найден(ы)
 */
export const FFAccountDeliveriesUpdateProductSizeQuantities404Schema = z.any()

export const FFAccountDeliveriesUpdateProductSizeQuantitiesMutationRequestSchema = z.lazy(() => updateProductSizeQuantitiesDtoSchema)

export const FFAccountDeliveriesUpdateProductSizeQuantitiesMutationResponseSchema = z.lazy(() => FFAccountDeliveriesUpdateProductSizeQuantities200Schema)