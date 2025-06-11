import { z } from 'zod'

export const FFAccountDeliveriesCompleteReceptionPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Приемка успешно завершена, статус обновлен
 */
export const FFAccountDeliveriesCompleteReception200Schema = z.any()

/**
 * @description Невозможно завершить приемку (неверный статус и т.д.)
 */
export const FFAccountDeliveriesCompleteReception400Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesCompleteReception404Schema = z.any()

export const FFAccountDeliveriesCompleteReceptionMutationResponseSchema = z.lazy(() => FFAccountDeliveriesCompleteReception200Schema)