import { z } from 'zod'

export const FFAccountDeliveriesAssignResponsiblePathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Ответственные успешно назначены
 */
export const FFAccountDeliveriesAssignResponsible200Schema = z.any()

/**
 * @description Поставка или сотрудник не найден(ы)
 */
export const FFAccountDeliveriesAssignResponsible404Schema = z.any()

/**
 * @description Массив ID ответственных сотрудников
 */
export const FFAccountDeliveriesAssignResponsibleMutationRequestSchema = z.object({
  responsibleIds: z.array(z.string().uuid()),
})

export const FFAccountDeliveriesAssignResponsibleMutationResponseSchema = z.lazy(() => FFAccountDeliveriesAssignResponsible200Schema)