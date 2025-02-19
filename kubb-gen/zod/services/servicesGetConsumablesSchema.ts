import { consumableSchema } from '../consumableSchema'
import { z } from 'zod'

export const servicesGetConsumables200Schema = z.array(z.lazy(() => consumableSchema))

export const servicesGetConsumablesQueryResponseSchema = z.lazy(() => servicesGetConsumables200Schema)