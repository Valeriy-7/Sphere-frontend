import { receptionRequestDtoSchema } from '../receptionRequestDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesProcessReceptionPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Приемка успешно обработана
 */
export const FFAccountDeliveriesProcessReception200Schema = z.any()

/**
 * @description Ошибка валидации данных приемки
 */
export const FFAccountDeliveriesProcessReception400Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesProcessReception404Schema = z.any()

/**
 * @description Данные для обработки приемки
 */
export const FFAccountDeliveriesProcessReceptionMutationRequestSchema = z.lazy(() => receptionRequestDtoSchema)

export const FFAccountDeliveriesProcessReceptionMutationResponseSchema = z.lazy(() => FFAccountDeliveriesProcessReception200Schema)