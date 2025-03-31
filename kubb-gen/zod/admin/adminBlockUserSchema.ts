import { blockUserDtoSchema } from '../blockUserDtoSchema'
import { userSchema } from '../userSchema'
import { z } from 'zod'

export const adminBlockUserPathParamsSchema = z.object({
  id: z.string(),
})

/**
 * @description Статус блокировки успешно обновлен
 */
export const adminBlockUser200Schema = z.lazy(() => userSchema)

export const adminBlockUserMutationRequestSchema = z.lazy(() => blockUserDtoSchema)

export const adminBlockUserMutationResponseSchema = z.lazy(() => adminBlockUser200Schema)