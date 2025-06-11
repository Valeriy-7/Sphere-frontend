import { updateTestDtoSchema } from '../updateTestDtoSchema'
import { z } from 'zod'

export const testUpdatePathParamsSchema = z.object({
  id: z.string(),
})

export const testUpdate200Schema = z.any()

export const testUpdateMutationRequestSchema = z.lazy(() => updateTestDtoSchema)

export const testUpdateMutationResponseSchema = z.lazy(() => testUpdate200Schema)