import { createChatDtoSchema } from '../createChatDtoSchema'
import { z } from 'zod'

/**
 * @description Чат успешно создан
 */
export const chatsCreate201Schema = z.any()

export const chatsCreateMutationRequestSchema = z.lazy(() => createChatDtoSchema)

export const chatsCreateMutationResponseSchema = z.lazy(() => chatsCreate201Schema)