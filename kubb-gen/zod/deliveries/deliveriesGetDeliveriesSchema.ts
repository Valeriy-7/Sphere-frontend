import { deliveryResponseExampleSchema } from '../deliveryResponseExampleSchema';
import { z } from 'zod';

/**
 * @description Список поставок успешно получен
 */
export const deliveriesGetDeliveries200Schema = z.array(
  z.lazy(() => deliveryResponseExampleSchema),
);

/**
 * @description Не авторизован
 */
export const deliveriesGetDeliveries401Schema = z.any();

export const deliveriesGetDeliveriesQueryResponseSchema = z.lazy(
  () => deliveriesGetDeliveries200Schema,
);
