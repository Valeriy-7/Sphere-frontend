import { cabinetSchema } from '../cabinetSchema'
import { completeRegistrationDtoSchema } from '../completeRegistrationDtoSchema'
import { z } from 'zod'

/**
 * @description Регистрация успешно завершена
 */
export const authCompleteRegistration201Schema = z.object({
  cabinet: z.lazy(() => cabinetSchema).optional(),
  token: z.string().describe('Токен для регистрации контрагентов').optional(),
})

/**
 * @description Некорректные данные для регистрации
 */
export const authCompleteRegistration400Schema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
  statusCode: z.number().optional(),
})

/**
 * @description Пользователь не авторизован
 */
export const authCompleteRegistration401Schema = z.any()

/**
 * @description Данные для завершения регистрации
 */
export const authCompleteRegistrationMutationRequestSchema = z.lazy(() => completeRegistrationDtoSchema)

export const authCompleteRegistrationMutationResponseSchema = z.lazy(() => authCompleteRegistration201Schema)