import { deliverySchema } from '../deliverySchema';
import { z } from 'zod';

export const deliveriesGetDeliveriesQueryParamsSchema = z
  .object({
    startDate: z.string().describe('Дата начала периода').optional(),
    endDate: z.string().describe('Дата окончания периода').optional(),
  })
  .optional();

/**
 * @description Список поставок успешно получен
 */
export const deliveriesGetDeliveries200Schema = z.array(z.lazy(() => deliverySchema));

export const deliveriesGetDeliveriesQueryResponseSchema = z.lazy(
  () => deliveriesGetDeliveries200Schema,
);
