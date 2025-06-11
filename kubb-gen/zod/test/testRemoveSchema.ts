import { z } from 'zod'

export const testRemovePathParamsSchema = z.object({
  id: z.string(),
})

export const testRemove200Schema = z.any()

export const testRemoveMutationResponseSchema = z.lazy(() => testRemove200Schema)