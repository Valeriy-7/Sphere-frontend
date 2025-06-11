import { z } from 'zod'

export const testFindOnePathParamsSchema = z.object({
  id: z.string(),
})

export const testFindOne200Schema = z.any()

export const testFindOneQueryResponseSchema = z.lazy(() => testFindOne200Schema)