import { updateProductLocationDtoSchema } from '../updateProductLocationDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesUpdateProductStorageLocationPathParamsSchema = z.object({
  deliveryId: z.string().uuid().describe('ID поставки'),
  productId: z.string().uuid().describe('ID продукта'),
})

/**
 * @description Место хранения успешно обновлено
 */
export const FFAccountDeliveriesUpdateProductStorageLocation200Schema = z.any()

/**
 * @description Поставка или продукт не найден(ы)
 */
export const FFAccountDeliveriesUpdateProductStorageLocation404Schema = z.any()

export const FFAccountDeliveriesUpdateProductStorageLocationMutationRequestSchema = z.lazy(() => updateProductLocationDtoSchema)

export const FFAccountDeliveriesUpdateProductStorageLocationMutationResponseSchema = z.lazy(() => FFAccountDeliveriesUpdateProductStorageLocation200Schema)