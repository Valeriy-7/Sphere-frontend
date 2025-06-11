import { z } from 'zod'

export const FFAccountDeliveriesRemoveResponsiblePersonPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
  responsibleId: z.string().uuid().describe('ID ответственного сотрудника для удаления'),
})

/**
 * @description Ответственный сотрудник успешно удален
 */
export const FFAccountDeliveriesRemoveResponsiblePerson200Schema = z.any()

/**
 * @description Поставка или сотрудник не найдены
 */
export const FFAccountDeliveriesRemoveResponsiblePerson404Schema = z.any()

export const FFAccountDeliveriesRemoveResponsiblePersonMutationResponseSchema = z.lazy(() => FFAccountDeliveriesRemoveResponsiblePerson200Schema)