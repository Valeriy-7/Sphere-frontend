import { consumableSchema } from '../consumableSchema'
import { createConsumableDtoSchema } from '../createConsumableDtoSchema'
import { z } from 'zod'

export const servicesCreateConsumable201Schema = z.lazy(() => consumableSchema)

export const servicesCreateConsumableMutationRequestSchema = z.lazy(() => createConsumableDtoSchema)

export const servicesCreateConsumableMutationResponseSchema = z.lazy(() => servicesCreateConsumable201Schema)