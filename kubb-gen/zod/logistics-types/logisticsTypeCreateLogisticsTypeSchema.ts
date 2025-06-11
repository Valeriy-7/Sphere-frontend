import { createLogisticsTypeDtoSchema } from '../createLogisticsTypeDtoSchema'
import { logisticsTypeSchema } from '../logisticsTypeSchema'
import { z } from 'zod'

/**
 * @description Тип логистики успешно создан
 */
export const logisticsTypeCreateLogisticsType201Schema = z.lazy(() => logisticsTypeSchema)

export const logisticsTypeCreateLogisticsTypeMutationRequestSchema = z.lazy(() => createLogisticsTypeDtoSchema)

export const logisticsTypeCreateLogisticsTypeMutationResponseSchema = z.lazy(() => logisticsTypeCreateLogisticsType201Schema)