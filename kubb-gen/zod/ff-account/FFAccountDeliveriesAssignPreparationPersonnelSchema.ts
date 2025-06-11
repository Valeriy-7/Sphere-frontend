import { assignPreparationPersonnelDtoSchema } from '../assignPreparationPersonnelDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesAssignPreparationPersonnelPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Персонал успешно назначен
 */
export const FFAccountDeliveriesAssignPreparationPersonnel200Schema = z.any()

/**
 * @description Неверный статус поставки или некорректные данные
 */
export const FFAccountDeliveriesAssignPreparationPersonnel400Schema = z.any()

/**
 * @description Поставка или сотрудник не найден(ы)
 */
export const FFAccountDeliveriesAssignPreparationPersonnel404Schema = z.any()

export const FFAccountDeliveriesAssignPreparationPersonnelMutationRequestSchema = z.lazy(() => assignPreparationPersonnelDtoSchema)

export const FFAccountDeliveriesAssignPreparationPersonnelMutationResponseSchema = z.lazy(() => FFAccountDeliveriesAssignPreparationPersonnel200Schema)