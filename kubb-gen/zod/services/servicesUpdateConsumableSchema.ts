import { consumableSchema } from '../consumableSchema'
import { createConsumableDtoSchema } from '../createConsumableDtoSchema'
import { z } from 'zod'

export const servicesUpdateConsumablePathParamsSchema = z.object({
  id: z.string(),
})

export const servicesUpdateConsumable200Schema = z.lazy(() => consumableSchema)

export const servicesUpdateConsumableMutationRequestSchema = z.lazy(() => createConsumableDtoSchema)

export const servicesUpdateConsumableMutationResponseSchema = z.lazy(() => servicesUpdateConsumable200Schema)