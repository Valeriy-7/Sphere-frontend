import { preparationEventDtoSchema } from '../preparationEventDtoSchema'
import { z } from 'zod'

/**
 * @description Preparation event processed successfully
 */
export const FFStorageProcessPreparationEvent201Schema = z.any()

/**
 * @description Delivery not found
 */
export const FFStorageProcessPreparationEvent404Schema = z.any()

export const FFStorageProcessPreparationEventMutationRequestSchema = z.lazy(() => preparationEventDtoSchema)

export const FFStorageProcessPreparationEventMutationResponseSchema = z.lazy(() => FFStorageProcessPreparationEvent201Schema)