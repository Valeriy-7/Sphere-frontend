import { messageSchema } from '../messageSchema'
import { z } from 'zod'

export const messagesFindAllPathParamsSchema = z.object({
  chatId: z.string(),
})

/**
 * @description Список сообщений успешно получен
 */
export const messagesFindAll200Schema = z.array(z.lazy(() => messageSchema))

export const messagesFindAllQueryResponseSchema = z.lazy(() => messagesFindAll200Schema)