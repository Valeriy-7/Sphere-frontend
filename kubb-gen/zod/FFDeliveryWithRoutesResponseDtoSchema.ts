import { FFRouteInfoResponseDtoSchema } from './FFRouteInfoResponseDtoSchema';
import { z } from 'zod';

export const FFDeliveryWithRoutesResponseDtoSchema = z.object({
  id: z.string().describe('ID поставки'),
  number: z.number().describe('Номер поставки'),
  status: z.string().describe('Статус поставки'),
  deliveryDate: z.string().describe('Дата поставки'),
  cargoPlaces: z.number().describe('Количество грузовых мест'),
  planQuantity: z.number().describe('Плановое количество товаров'),
  factQuantity: z.number().describe('Фактическое количество товаров'),
  defects: z.number().describe('Количество дефектов'),
  productsPrice: z.number().describe('Стоимость товаров'),
  ffServicesPrice: z.number().describe('Стоимость услуг фулфилмента'),
  logisticsToFFPrice: z.number().describe('Стоимость логистики до фулфилмента'),
  totalPrice: z.number().describe('Общая сумма (товары + услуги + логистика)'),
  routes: z.array(z.lazy(() => FFRouteInfoResponseDtoSchema)).describe('Маршруты поставки'),
});
