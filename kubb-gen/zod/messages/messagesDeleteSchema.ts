import { z } from 'zod'

export const messagesDeletePathParamsSchema = z.object({
  messageId: z.string(),
})

/**
 * @description Сообщение успешно удалено
 */
export const messagesDelete200Schema = z.any()

export const messagesDeleteMutationResponseSchema = z.lazy(() => messagesDelete200Schema)