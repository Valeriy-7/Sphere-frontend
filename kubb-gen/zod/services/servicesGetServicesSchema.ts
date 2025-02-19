import { serviceSchema } from '../serviceSchema'
import { z } from 'zod'

export const servicesGetServices200Schema = z.array(z.lazy(() => serviceSchema))

export const servicesGetServicesQueryResponseSchema = z.lazy(() => servicesGetServices200Schema)