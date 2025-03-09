import { z } from 'zod';

export const FFDeliverySummaryDtoSchema = z.object({
  suppliersCount: z.number().describe('Количество поставщиков'),
  totalCargoPlaces: z.number().describe('Общее количество грузовых мест'),
  totalPlanQuantity: z.number().describe('Общее плановое количество товаров'),
  totalFactQuantity: z.number().describe('Общее фактическое количество товаров'),
  totalDefects: z.number().describe('Общее количество дефектов'),
  totalProductsPrice: z.number().describe('Общая стоимость товаров'),
  totalFFServicesPrice: z.number().describe('Общая стоимость услуг ФФ'),
  totalLogisticsToFFPrice: z.number().describe('Общая стоимость логистики до ФФ'),
});
