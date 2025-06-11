import { z } from 'zod'

/**
 * @description Поля legalCompanyName успешно очищены
 */
export const cabinetsClearAllWildberriesLegalNames200Schema = z.number()

/**
 * @description Ошибка при очистке полей
 */
export const cabinetsClearAllWildberriesLegalNames400Schema = z.any()

export const cabinetsClearAllWildberriesLegalNamesMutationResponseSchema = z.lazy(() => cabinetsClearAllWildberriesLegalNames200Schema)