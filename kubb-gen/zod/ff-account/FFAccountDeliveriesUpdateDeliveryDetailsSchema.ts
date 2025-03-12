import { updateDeliveryDetailsDtoSchema } from '../updateDeliveryDetailsDtoSchema';
import { z } from 'zod';

export const FFAccountDeliveriesUpdateDeliveryDetailsPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
});

/**
 * @description Детали поставки успешно обновлены
 */
export const FFAccountDeliveriesUpdateDeliveryDetails200Schema = z.any();

/**
 * @description Поставка или логист не найдены
 */
export const FFAccountDeliveriesUpdateDeliveryDetails404Schema = z.any();

/**
 * @description Данные для обновления деталей поставки
 */
export const FFAccountDeliveriesUpdateDeliveryDetailsMutationRequestSchema = z.lazy(
  () => updateDeliveryDetailsDtoSchema,
);

export const FFAccountDeliveriesUpdateDeliveryDetailsMutationResponseSchema = z.lazy(
  () => FFAccountDeliveriesUpdateDeliveryDetails200Schema,
);
