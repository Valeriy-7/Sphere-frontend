import { updateStoreInfoDtoSchema } from '../updateStoreInfoDtoSchema';
import { z } from 'zod';

export const FFAccountDeliveriesUpdateStoreInfoPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
});

/**
 * @description Информация о магазине успешно обновлена
 */
export const FFAccountDeliveriesUpdateStoreInfo200Schema = z.any();

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesUpdateStoreInfo404Schema = z.any();

/**
 * @description Данные для обновления информации о магазине
 */
export const FFAccountDeliveriesUpdateStoreInfoMutationRequestSchema = z.lazy(
  () => updateStoreInfoDtoSchema,
);

export const FFAccountDeliveriesUpdateStoreInfoMutationResponseSchema = z.lazy(
  () => FFAccountDeliveriesUpdateStoreInfo200Schema,
);
