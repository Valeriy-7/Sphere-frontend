import { cabinetSchema } from '../cabinetSchema'
import { verifyCabinetDtoSchema } from '../verifyCabinetDtoSchema'
import { z } from 'zod'

export const adminVerifyCabinetPathParamsSchema = z.object({
  id: z.string(),
})

/**
 * @description Статус верификации успешно обновлен
 */
export const adminVerifyCabinet200Schema = z.lazy(() => cabinetSchema)

export const adminVerifyCabinetMutationRequestSchema = z.lazy(() => verifyCabinetDtoSchema)

export const adminVerifyCabinetMutationResponseSchema = z.lazy(() => adminVerifyCabinet200Schema)