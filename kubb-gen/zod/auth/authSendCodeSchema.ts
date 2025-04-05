import { sendCodeDtoSchema } from '../sendCodeDtoSchema'
import { z } from 'zod'

/**
 * @description Код успешно отправлен
 */
export const authSendCode200Schema = z.any()

/**
 * @description Некорректный формат номера телефона
 */
export const authSendCode400Schema = z.any()

export const authSendCodeMutationRequestSchema = z.lazy(() => sendCodeDtoSchema)

export const authSendCodeMutationResponseSchema = z.lazy(() => authSendCode200Schema)