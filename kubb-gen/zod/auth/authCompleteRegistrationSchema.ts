import { cabinetSchema } from '../cabinetSchema'
import { completeRegistrationDtoSchema } from '../completeRegistrationDtoSchema'
import { z } from 'zod'

/**
 * @description Регистрация успешно завершена
 */
export const authCompleteRegistration201Schema = z.lazy(() => cabinetSchema)

/**
 * @description Некорректные данные для регистрации
 */
export const authCompleteRegistration400Schema = z.any()

/**
 * @description Пользователь не авторизован
 */
export const authCompleteRegistration401Schema = z.any()

/**
 * @description Данные для завершения регистрации
 */
export const authCompleteRegistrationMutationRequestSchema = z.lazy(() => completeRegistrationDtoSchema)

export const authCompleteRegistrationMutationResponseSchema = z.lazy(() => authCompleteRegistration201Schema)