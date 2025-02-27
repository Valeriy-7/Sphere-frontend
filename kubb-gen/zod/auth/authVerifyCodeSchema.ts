import { authResponseDtoSchema } from '../authResponseDtoSchema';
import { verifyCodeDtoSchema } from '../verifyCodeDtoSchema';
import { z } from 'zod';

/**
 * @description Код успешно подтвержден
 */
export const authVerifyCode200Schema = z.lazy(() => authResponseDtoSchema);

/**
 * @description Некорректный код или формат номера телефона
 */
export const authVerifyCode400Schema = z.any();

/**
 * @description Код не найден или истек срок его действия
 */
export const authVerifyCode404Schema = z.any();

/**
 * @description Данные для проверки кода
 */
export const authVerifyCodeMutationRequestSchema = z.lazy(() => verifyCodeDtoSchema);

export const authVerifyCodeMutationResponseSchema = z.lazy(() => authVerifyCode200Schema);
