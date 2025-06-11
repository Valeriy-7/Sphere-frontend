import { updateProductQuantitiesDtoSchema } from '../updateProductQuantitiesDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesUpdateProductQuantitiesPathParamsSchema = z.object({
  deliveryId: z.string().uuid().describe('ID поставки'),
  productId: z.string().uuid().describe('ID продукта'),
})

/**
 * @description Количества успешно обновлены
 */
export const FFAccountDeliveriesUpdateProductQuantities200Schema = z.any()

/**
 * @description Ошибка валидации (Факт+Брак != План или отрицательные значения)
 */
export const FFAccountDeliveriesUpdateProductQuantities400Schema = z.any()

/**
 * @description Поставка или продукт не найден(ы)
 */
export const FFAccountDeliveriesUpdateProductQuantities404Schema = z.any()

export const FFAccountDeliveriesUpdateProductQuantitiesMutationRequestSchema = z.lazy(() => updateProductQuantitiesDtoSchema)

export const FFAccountDeliveriesUpdateProductQuantitiesMutationResponseSchema = z.lazy(() => FFAccountDeliveriesUpdateProductQuantities200Schema)