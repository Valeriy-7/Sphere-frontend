import { FFDeliveryResponseDtoSchema } from '../FFDeliveryResponseDtoSchema';
import { z } from 'zod';

export const FFAccountDeliveriesGetDeliveriesQueryParamsSchema = z
  .object({
    status: z
      .enum(['CREATED', 'IN_PROGRESS', 'ACCEPTED', 'PREPARATION', 'COMPLETED'])
      .describe('Фильтр по статусу поставки')
      .optional(),
    startDate: z.string().describe('Начальная дата периода в формате YYYY-MM-DD').optional(),
    endDate: z.string().describe('Конечная дата периода в формате YYYY-MM-DD').optional(),
  })
  .optional();

/**
 * @description Список поставок и сводная информация
 */
export const FFAccountDeliveriesGetDeliveries200Schema = z.lazy(() => FFDeliveryResponseDtoSchema);

export const FFAccountDeliveriesGetDeliveriesQueryResponseSchema = z.lazy(
  () => FFAccountDeliveriesGetDeliveries200Schema,
);
