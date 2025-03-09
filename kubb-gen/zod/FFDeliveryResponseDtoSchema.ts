import { FFDeliveryListItemDtoSchema } from './FFDeliveryListItemDtoSchema';
import { FFDeliverySummaryDtoSchema } from './FFDeliverySummaryDtoSchema';
import { z } from 'zod';

export const FFDeliveryResponseDtoSchema = z.object({
  summary: z.lazy(() => FFDeliverySummaryDtoSchema).describe('Сводная информация о поставках'),
  deliveries: z.array(z.lazy(() => FFDeliveryListItemDtoSchema)).describe('Список поставок'),
});
