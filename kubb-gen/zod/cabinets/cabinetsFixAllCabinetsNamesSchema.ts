import { z } from 'zod'

/**
 * @description Количество обновленных кабинетов
 */
export const cabinetsFixAllCabinetsNames200Schema = z.number()

export const cabinetsFixAllCabinetsNamesMutationResponseSchema = z.lazy(() => cabinetsFixAllCabinetsNames200Schema)