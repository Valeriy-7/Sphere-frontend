import { z } from 'zod'

export const FFAccountDeliveriesStartPreparationPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Подготовка успешно начата
 */
export const FFAccountDeliveriesStartPreparation200Schema = z.any()

/**
 * @description Неверный статус поставки или подготовка уже начата
 */
export const FFAccountDeliveriesStartPreparation400Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesStartPreparation404Schema = z.any()

export const FFAccountDeliveriesStartPreparationMutationResponseSchema = z.lazy(() => FFAccountDeliveriesStartPreparation200Schema)