import { markAsReadDtoSchema } from '../markAsReadDtoSchema'
import { z } from 'zod'

/**
 * @description Сообщения успешно отмечены как прочитанные
 */
export const chatsMarkAsRead200Schema = z.any()

export const chatsMarkAsReadMutationRequestSchema = z.lazy(() => markAsReadDtoSchema)

export const chatsMarkAsReadMutationResponseSchema = z.lazy(() => chatsMarkAsRead200Schema)