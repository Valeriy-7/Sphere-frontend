import { deliveryStatusSchema } from '../deliveryStatusSchema';
import { FFDeliveryResponseDtoSchema } from '../FFDeliveryResponseDtoSchema';
import { z } from 'zod';

export const FFDeliveriesGetFFDeliveriesQueryParamsSchema = z
  .object({
    status: z.lazy(() => deliveryStatusSchema).optional(),
    startDate: z.string().describe('Дата начала периода в формате ISO (YYYY-MM-DD)').optional(),
    endDate: z.string().describe('Дата окончания периода в формате ISO (YYYY-MM-DD)').optional(),
  })
  .optional();

/**
 * @description Список поставок на ФФ успешно получен
 */
export const FFDeliveriesGetFFDeliveries200Schema = z.lazy(() => FFDeliveryResponseDtoSchema);

/**
 * @description Не авторизован
 */
export const FFDeliveriesGetFFDeliveries401Schema = z.any();

export const FFDeliveriesGetFFDeliveriesQueryResponseSchema = z.lazy(
  () => FFDeliveriesGetFFDeliveries200Schema,
);
