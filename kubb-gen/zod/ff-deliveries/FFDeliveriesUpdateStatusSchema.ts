import { deliverySchema } from '../deliverySchema';
import { updateDeliveryStatusDtoSchema } from '../updateDeliveryStatusDtoSchema';
import { z } from 'zod';

export const FFDeliveriesUpdateStatusPathParamsSchema = z.object({
  id: z.string(),
});

/**
 * @description Статус поставки успешно обновлен
 */
export const FFDeliveriesUpdateStatus200Schema = z.lazy(() => deliverySchema);

export const FFDeliveriesUpdateStatusMutationRequestSchema = z.lazy(
  () => updateDeliveryStatusDtoSchema,
);

export const FFDeliveriesUpdateStatusMutationResponseSchema = z.lazy(
  () => FFDeliveriesUpdateStatus200Schema,
);
