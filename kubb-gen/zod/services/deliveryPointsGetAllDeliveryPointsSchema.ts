import { deliveryPointDtoSchema } from '../deliveryPointDtoSchema';
import { z } from 'zod';

export const deliveryPointsGetAllDeliveryPointsQueryParamsSchema = z
  .object({
    cabinetId: z.string().describe('ID кабинета для приоритизации фулфилментов').optional(),
  })
  .optional();

/**
 * @description Полный список точек доставки
 */
export const deliveryPointsGetAllDeliveryPoints200Schema = z.array(
  z.lazy(() => deliveryPointDtoSchema),
);

export const deliveryPointsGetAllDeliveryPointsQueryResponseSchema = z.lazy(
  () => deliveryPointsGetAllDeliveryPoints200Schema,
);
