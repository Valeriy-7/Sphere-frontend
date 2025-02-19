import { createServiceDtoSchema } from '../createServiceDtoSchema'
import { serviceSchema } from '../serviceSchema'
import { z } from 'zod'

export const servicesCreateService201Schema = z.lazy(() => serviceSchema)

export const servicesCreateServiceMutationRequestSchema = z.lazy(() => createServiceDtoSchema)

export const servicesCreateServiceMutationResponseSchema = z.lazy(() => servicesCreateService201Schema)