import { logisticsSchema } from '../logisticsSchema'
import { z } from 'zod'

export const servicesGetLogistics200Schema = z.array(z.lazy(() => logisticsSchema))

export const servicesGetLogisticsQueryResponseSchema = z.lazy(() => servicesGetLogistics200Schema)