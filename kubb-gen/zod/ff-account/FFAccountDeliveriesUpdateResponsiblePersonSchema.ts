import { z } from 'zod'

export const FFAccountDeliveriesUpdateResponsiblePersonPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
})

/**
 * @description Ответственный сотрудник успешно назначен
 */
export const FFAccountDeliveriesUpdateResponsiblePerson200Schema = z.any()

/**
 * @description Поставка или сотрудник не найдены
 */
export const FFAccountDeliveriesUpdateResponsiblePerson404Schema = z.any()

/**
 * @description ID ответственного сотрудника
 */
export const FFAccountDeliveriesUpdateResponsiblePersonMutationRequestSchema = z.object({
  responsiblePersonId: z.string().uuid().describe('ID ответственного сотрудника'),
})

export const FFAccountDeliveriesUpdateResponsiblePersonMutationResponseSchema = z.lazy(() => FFAccountDeliveriesUpdateResponsiblePerson200Schema)