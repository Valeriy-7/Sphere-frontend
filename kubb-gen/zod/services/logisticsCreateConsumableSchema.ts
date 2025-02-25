import { consumableSchema } from '../consumableSchema'
import { createConsumableDtoSchema } from '../createConsumableDtoSchema'
import { z } from 'zod'

/**
 * @description Расходник успешно создан
 */
export const logisticsCreateConsumable201Schema = z.lazy(() => consumableSchema)

export const logisticsCreateConsumableMutationRequestSchema = z.lazy(() => createConsumableDtoSchema)

export const logisticsCreateConsumableMutationResponseSchema = z.lazy(() => logisticsCreateConsumable201Schema)