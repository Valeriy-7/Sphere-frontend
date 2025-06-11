import { z } from 'zod'

export const FFAccountDeliveriesCompletePreparationPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Подготовка успешно завершена, статус обновлен на COMPLETED
 */
export const FFAccountDeliveriesCompletePreparation200Schema = z.any()

/**
 * @description Ошибка валидации (не все кол-ва заполнены) или неверный статус
 */
export const FFAccountDeliveriesCompletePreparation400Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesCompletePreparation404Schema = z.any()

export const FFAccountDeliveriesCompletePreparationMutationResponseSchema = z.lazy(() => FFAccountDeliveriesCompletePreparation200Schema)