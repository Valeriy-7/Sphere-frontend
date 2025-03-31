import { z } from 'zod'

export const chatsFindOnePathParamsSchema = z.object({
  id: z.string(),
})

/**
 * @description Информация о чате успешно получена
 */
export const chatsFindOne200Schema = z.any()

export const chatsFindOneQueryResponseSchema = z.lazy(() => chatsFindOne200Schema)