import { updateDeliveryStatusDtoSchema } from '../updateDeliveryStatusDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesUpdateDeliveryStatusPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
})

/**
 * @description Статус поставки успешно обновлен
 */
export const FFAccountDeliveriesUpdateDeliveryStatus200Schema = z.any()

/**
 * @description Недопустимый переход статуса
 */
export const FFAccountDeliveriesUpdateDeliveryStatus400Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesUpdateDeliveryStatus404Schema = z.any()

/**
 * @description Данные для обновления статуса поставки
 */
export const FFAccountDeliveriesUpdateDeliveryStatusMutationRequestSchema = z.lazy(() => updateDeliveryStatusDtoSchema)

export const FFAccountDeliveriesUpdateDeliveryStatusMutationResponseSchema = z.lazy(() => FFAccountDeliveriesUpdateDeliveryStatus200Schema)