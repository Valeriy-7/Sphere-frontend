import { z } from 'zod';

export const cabinetsRemovePartnerPathParamsSchema = z.object({
  partnerId: z.string(),
});

/**
 * @description Партнер успешно удален
 */
export const cabinetsRemovePartner200Schema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
});

/**
 * @description Ошибка при удалении партнера
 */
export const cabinetsRemovePartner400Schema = z.any();

/**
 * @description Кабинет или партнер не найден
 */
export const cabinetsRemovePartner404Schema = z.any();

export const cabinetsRemovePartnerMutationResponseSchema = z.lazy(
  () => cabinetsRemovePartner200Schema,
);
