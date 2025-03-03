import { deliverySchema } from '../deliverySchema';
import { z } from 'zod';

export const deliveriesGetDeliveryByIdPathParamsSchema = z.object({
  id: z.string(),
});

/**
 * @description Информация о поставке успешно получена
 */
export const deliveriesGetDeliveryById200Schema = z.lazy(() => deliverySchema);

/**
 * @description Поставка не найдена
 */
export const deliveriesGetDeliveryById404Schema = z.any();

export const deliveriesGetDeliveryByIdQueryResponseSchema = z.lazy(
  () => deliveriesGetDeliveryById200Schema,
);
