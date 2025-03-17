import { FFDeliveryStatsResponseDtoSchema } from './FFDeliveryStatsResponseDtoSchema';
import { FFDeliveryWithRoutesResponseDtoSchema } from './FFDeliveryWithRoutesResponseDtoSchema';
import { z } from 'zod';

export const FFDeliveryWithRoutesListResponseDtoSchema = z.object({
  items: z
    .array(z.lazy(() => FFDeliveryWithRoutesResponseDtoSchema))
    .describe('Список поставок с маршрутами'),
  stats: z.lazy(() => FFDeliveryStatsResponseDtoSchema).describe('Статистика по всем поставкам'),
  total: z.number().describe('Общее количество поставок'),
  page: z.number().describe('Текущая страница'),
  pages: z.number().describe('Всего страниц'),
  limit: z.number().describe('Количество записей на странице'),
});
