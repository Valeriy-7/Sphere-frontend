import { createMessageDtoSchema } from '../createMessageDtoSchema'
import { messageSchema } from '../messageSchema'
import { z } from 'zod'

/**
 * @description Сообщение успешно создано
 */
export const messagesCreate201Schema = z.lazy(() => messageSchema)

export const messagesCreateMutationRequestSchema = z.lazy(() => createMessageDtoSchema)

export const messagesCreateMutationResponseSchema = z.lazy(() => messagesCreate201Schema)