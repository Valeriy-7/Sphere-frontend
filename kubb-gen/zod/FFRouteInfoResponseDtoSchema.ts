import { FFSupplierInfoResponseDtoSchema } from './FFSupplierInfoResponseDtoSchema';
import { z } from 'zod';

export const FFRouteInfoResponseDtoSchema = z.object({
  id: z.string().describe('ID маршрута'),
  name: z.string().describe('Название маршрута'),
  status: z.string().describe('Статус маршрута'),
  deliveryDate: z.string().describe('Дата доставки'),
  address: z.string().describe('Адрес доставки').optional(),
  deliveryNumber: z.string().describe('Номер поставки').optional(),
  suppliers: z
    .array(z.lazy(() => FFSupplierInfoResponseDtoSchema))
    .describe('Список поставщиков на маршруте'),
});
