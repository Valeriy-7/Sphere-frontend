import { z } from 'zod'

export const cabinetsClearLegalNamePathParamsSchema = z.object({
  id: z.string(),
})

/**
 * @description Поле legalCompanyName успешно очищено
 */
export const cabinetsClearLegalName200Schema = z.boolean()

/**
 * @description Ошибка при очистке поля
 */
export const cabinetsClearLegalName400Schema = z.any()

export const cabinetsClearLegalNameMutationResponseSchema = z.lazy(() => cabinetsClearLegalName200Schema)