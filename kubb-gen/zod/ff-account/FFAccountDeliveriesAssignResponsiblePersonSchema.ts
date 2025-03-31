import { assignResponsiblePersonDtoSchema } from '../assignResponsiblePersonDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesAssignResponsiblePersonPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
})

/**
 * @description Ответственный сотрудник успешно назначен
 */
export const FFAccountDeliveriesAssignResponsiblePerson200Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesAssignResponsiblePerson404Schema = z.any()

/**
 * @description Данные для назначения ответственного сотрудника
 */
export const FFAccountDeliveriesAssignResponsiblePersonMutationRequestSchema = z.lazy(() => assignResponsiblePersonDtoSchema)

export const FFAccountDeliveriesAssignResponsiblePersonMutationResponseSchema = z.lazy(() => FFAccountDeliveriesAssignResponsiblePerson200Schema)