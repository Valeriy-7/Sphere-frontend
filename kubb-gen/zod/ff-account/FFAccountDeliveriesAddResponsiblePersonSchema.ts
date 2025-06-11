import { z } from 'zod'

export const FFAccountDeliveriesAddResponsiblePersonPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
})

/**
 * @description Ответственный сотрудник успешно добавлен
 */
export const FFAccountDeliveriesAddResponsiblePerson200Schema = z.any()

/**
 * @description Поставка или сотрудник не найдены
 */
export const FFAccountDeliveriesAddResponsiblePerson404Schema = z.any()

/**
 * @description ID ответственного сотрудника для добавления
 */
export const FFAccountDeliveriesAddResponsiblePersonMutationRequestSchema = z.object({
  responsiblePersonId: z.string().uuid().describe('ID ответственного сотрудника'),
})

export const FFAccountDeliveriesAddResponsiblePersonMutationResponseSchema = z.lazy(() => FFAccountDeliveriesAddResponsiblePerson200Schema)