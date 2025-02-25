import { createServiceDtoSchema } from '../createServiceDtoSchema'
import { serviceSchema } from '../serviceSchema'
import { z } from 'zod'

export const logisticsUpdateServicePathParamsSchema = z.object({
  id: z.string(),
})

/**
 * @description Услуга успешно обновлена
 */
export const logisticsUpdateService200Schema = z.lazy(() => serviceSchema)

export const logisticsUpdateServiceMutationRequestSchema = z.lazy(() => createServiceDtoSchema)

export const logisticsUpdateServiceMutationResponseSchema = z.lazy(() => logisticsUpdateService200Schema)