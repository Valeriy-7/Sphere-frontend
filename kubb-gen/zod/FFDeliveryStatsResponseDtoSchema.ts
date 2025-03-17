import { z } from 'zod';

export const FFDeliveryStatsResponseDtoSchema = z.object({
  planQuantity: z.number().describe('Общее плановое количество товаров'),
  factQuantity: z.number().describe('Общее фактическое количество товаров'),
  defects: z.number().describe('Общее количество дефектов'),
  productsPrice: z.number().describe('Общая стоимость товаров'),
  ffServicesPrice: z.number().describe('Общая стоимость услуг фулфилмента'),
  logisticsToFFPrice: z.number().describe('Общая стоимость логистики до фулфилмента'),
});
