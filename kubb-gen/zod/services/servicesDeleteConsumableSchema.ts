import { z } from 'zod'

export const servicesDeleteConsumablePathParamsSchema = z.object({
  id: z.string(),
})

export const servicesDeleteConsumable200Schema = z.any()

export const servicesDeleteConsumableMutationResponseSchema = z.lazy(() => servicesDeleteConsumable200Schema)