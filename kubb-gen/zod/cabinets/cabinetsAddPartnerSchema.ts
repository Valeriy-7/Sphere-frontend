import { z } from 'zod';

export const cabinetsAddPartnerPathParamsSchema = z.object({
  partnerId: z.string(),
});

/**
 * @description Партнер успешно добавлен
 */
export const cabinetsAddPartner200Schema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
});

/**
 * @description Ошибка при добавлении партнера
 */
export const cabinetsAddPartner400Schema = z.any();

/**
 * @description Кабинет или партнер не найден
 */
export const cabinetsAddPartner404Schema = z.any();

export const cabinetsAddPartnerMutationResponseSchema = z.lazy(() => cabinetsAddPartner200Schema);
