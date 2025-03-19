import { FFSupplierInfoResponseDtoSchema } from './FFSupplierInfoResponseDtoSchema';
import { z } from 'zod';

export const FFRouteInfoResponseDtoSchema = z.object({
  id: z.string().describe('ID маршрута'),
  number: z.number().describe('Порядковый номер маршрута'),
  name: z.string().describe('Название маршрута'),
  status: z.string().describe('Статус маршрута'),
  deliveryDate: z.string().describe('Дата доставки'),
  address: z.string().describe('Адрес доставки').optional(),
  deliveryNumber: z.string().describe('Номер поставки').optional(),
  suppliers: z
    .array(z.lazy(() => FFSupplierInfoResponseDtoSchema))
    .describe('Список поставщиков на маршруте'),
  planQuantity: z.number().describe('Плановое количество товаров'),
  factQuantity: z.number().describe('Фактическое количество товаров'),
  defects: z.number().describe('Количество дефектов'),
  productsPrice: z.number().describe('Стоимость товаров'),
  ffServicesPrice: z.number().describe('Стоимость услуг фулфилмента'),
  logisticsToFFPrice: z.number().describe('Стоимость логистики до фулфилмента'),
  totalPrice: z.number().describe('Общая сумма (товары + услуги + логистика)'),
});
