import { sendCodeDtoSchema } from '../sendCodeDtoSchema';
import { z } from 'zod';

/**
 * @description Код успешно отправлен
 */
export const authSendCode200Schema = z.any();

/**
 * @description Некорректный формат номера телефона
 */
export const authSendCode400Schema = z.any();

/**
 * @description Слишком частые запросы. Попробуйте позже
 */
export const authSendCode429Schema = z.any();

/**
 * @description Данные для отправки кода
 */
export const authSendCodeMutationRequestSchema = z.lazy(() => sendCodeDtoSchema);

export const authSendCodeMutationResponseSchema = z.lazy(() => authSendCode200Schema);
