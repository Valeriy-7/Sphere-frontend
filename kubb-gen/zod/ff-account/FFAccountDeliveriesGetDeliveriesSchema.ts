import { deliveryStatusSchema } from '../deliveryStatusSchema';
import { FFDeliveryWithRoutesListResponseDtoSchema } from '../FFDeliveryWithRoutesListResponseDtoSchema';
import { z } from 'zod';

export const FFAccountDeliveriesGetDeliveriesQueryParamsSchema = z
  .object({
    page: z.number().min(1).default(1).describe('Номер страницы'),
    limit: z
      .number()
      .min(-1)
      .max(100)
      .default(10)
      .describe(
        'Количество записей на странице. Для получения всех записей установите значение -1.',
      ),
    status: z.lazy(() => deliveryStatusSchema).optional(),
    startDate: z.date().describe('Начальная дата периода в формате YYYY-MM-DD').optional(),
    endDate: z.date().describe('Конечная дата периода в формате YYYY-MM-DD').optional(),
  })
  .optional();

/**
 * @description Список поставок с маршрутами, поставщиками и статистикой
 */
export const FFAccountDeliveriesGetDeliveries200Schema = z.lazy(
  () => FFDeliveryWithRoutesListResponseDtoSchema,
);

export const FFAccountDeliveriesGetDeliveriesQueryResponseSchema = z.lazy(
  () => FFAccountDeliveriesGetDeliveries200Schema,
);
