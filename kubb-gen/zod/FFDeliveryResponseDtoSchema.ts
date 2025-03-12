import { FFDeliveryListItemDtoSchema } from './FFDeliveryListItemDtoSchema';
import { FFDeliverySummaryDtoSchema } from './FFDeliverySummaryDtoSchema';
import { z } from 'zod';

export const FFDeliveryResponseDtoSchema = z.object({
  summary: z.lazy(() => FFDeliverySummaryDtoSchema).describe('Сводная информация о поставках'),
  deliveries: z.array(z.lazy(() => FFDeliveryListItemDtoSchema)).describe('Список поставок'),
  total: z.number().describe('Общее количество поставок'),
  page: z.number().describe('Текущая страница'),
  pages: z.number().describe('Всего страниц'),
  limit: z.number().describe('Количество записей на странице'),
});
